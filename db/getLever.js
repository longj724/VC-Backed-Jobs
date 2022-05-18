const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const cheerio = require('cheerio');
const readline = require('readline');
const TEAMS = require('./constants');

const prisma = new PrismaClient();

const insertJobs = async (folderPath) => {
  await clearPostions();
  fs.readdir(folderPath, (err, files) => {
    files.forEach(async (file, _) => {
      const fileStream = fs.createReadStream('./data/openings/lever/' + file);

      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      });

      let firm = '';
      let curLine = -1;

      for await (const line of rl) {
        curLine++;
        if (curLine === 0) {
          firm = line;
          continue;
        }

        if (line === null || line === '') continue;
        const companyName = file.split('.')[0];

        const $ = cheerio.load(line);
        const link = $('.posting-apply').find('a').attr('href');
        const role = $('h5').first().text();
        const location = $('.posting-category').first().text();
        const team = $('.sort-by-team').text();

        let teamTag = '';
        if (TEAMS.includes(team.toUpperCase())) {
          teamTag = team;
        }

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
            firm: firm,
            team: team,
            team_tag: teamTag,
            board: 'Lever',
            company_id: companyExists.id,
          },
        });
      }
    });
  });
};

const clearPostions = async () => {
  await prisma.position.deleteMany({
    where: {
      board: 'Lever',
    },
  });
};

insertJobs('./data/openings/lever');
// clearPostions();
