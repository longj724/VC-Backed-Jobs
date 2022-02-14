const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const { writeDataToFile } = require('../utils/fileOperations');
const { getJobData } = require('./getJobData');

const geta16zPage = async () => {
  axios
    .get('https://a16z.com/portfolio')
    .then((res) => {
      const result = writeDataToFile('./data/firms/a16z.txt', res.data);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

// Change this to read from the local copy of the a16z file
const getCompanies = async (filePath) => {
  fs.readFile(filePath, (err, data) => {
    if (err) throw err;

    const $ = cheerio.load(data);

    const divs = $('.company__thumbnail');

    let companyUrls = [];
    divs.each((_, element) => {
      companyUrls.push($(element).find('a').attr('href'));
    });

    const companyNames = companyUrls
      .filter((url) => url !== undefined)
      .map((url) => {
        let domain = new URL(url);
        let hostname = domain.host;
        let split = hostname.split('.');
        console.log(split[split.length - 2]);
        return split[split.length - 2];
      });

    companyNames.forEach((name) => {
      getJobData(name);
    });
  });
};

const main = async () => {
  // await geta16zPage();
  getCompanies('./data/firms/a16z.txt');
};

main();

// jobs.lever.com/companyname
// Get div class = posting

// boards.greenhouse.io/companyname
// Get div class = opening
