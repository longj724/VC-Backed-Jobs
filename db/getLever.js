const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const cheerio = require('cheerio');
const readline = require('readline');

const prisma = new PrismaClient();

const getFiles = async (folderPath) => {
  await clearPostions();
  fs.readdir(folderPath, (err, files) => {
    files.forEach(async (file, _) => {
      const fileStream = fs.createReadStream('./data/openings/lever/' + file);

      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      });

      for await (const line of rl) {
        if (line === null || line === '') continue;
        console.log('line is: ', line);
        const companyName = file.split('.')[0];
        console.log('company is', companyName);

        const $ = cheerio.load(line);
        const link = $('.posting-apply').find('a').attr('href');
        const role = $('h5').first().text();
        const location = $('.posting-category').first().text();

        console.log('role is', role);
        console.log('link is', link);
        console.log('location is', location);

        let companyExists = await prisma.company.findFirst({
          where: {
            name: companyName,
          },
        });

        if (!companyExists) {
          companyExists = await prisma.company.create({
            data: {
              name: companyName,
            },
          });
        }

        console.log('company id is', companyExists.id);

        await prisma.position.create({
          data: {
            role,
            link,
            location,
            firm: 'Lever',
            company_id: companyExists.id,
          },
        });
      }
    });
  });
};

const clearPostions = async () => {
  const positions = await prisma.position.findMany();
  positions.map(async (position) => {
    await prisma.position.delete({
      where: {
        id: position.id,
      },
    });
  });
};

// getFiles('./data/openings/lever');
clearPostions();
