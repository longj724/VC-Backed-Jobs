const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const cheerio = require('cheerio');
const readline = require('readline');
const { TEAMS } = require('./constants');

const prisma = new PrismaClient();

const insertJobs = async (folderPath) => {
  clearPositions();
  fs.readdir(folderPath, (err, files) => {
    files.forEach(async (file, _) => {
      const fileStream = fs.createReadStream('./data/openings/gh/' + file);

      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      });

      const companyName = file.split('.')[0];
      let curLine = 0;
      let link = '';
      let role = '';
      let location = '';

      for await (const line of rl) {
        if (
          line === null ||
          line === '' ||
          curLine % 4 == 0 ||
          curLine % 4 === 2
        ) {
          curLine++;
          continue;
        }

        const $ = cheerio.load(line);

        // Get link and role
        if (curLine % 4 == 1) {
          link = $('a').first().attr('href');
          role = $('a').first().text();
        } else {
          location = $('span').text();

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

          await prisma.position.create({
            data: {
              role,
              link,
              location,
              firm: '',
              team: '',
              board: 'Greenhouse',
              company_id: companyExists.id,
            },
          });
        }

        curLine++;
      }
    });
  });
};

const clearPositions = async () => {
  await prisma.position.deleteMany({
    where: {
      board: 'Greenhouse',
    },
  });
};

// clearPositions();
insertJobs('./data/openings/gh');
