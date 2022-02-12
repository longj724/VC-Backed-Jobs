const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const { getJobData } = require('./getJobData');

const getCompanies = async () => {

  axios.get('https://a16z.com/portfolio/').then((res) => {
    const $ = cheerio.load(res.data);

    const divs = $('.company__thumbnail');

    const urls = divs.each((_, element) => {
      return $(element).find('a').attr('href');
    });

    urls.map((url) => {
      let domain = new URL(url);
      console.log('domain');
      return domain;
    });
  });
};

let companyNames;

// Read from a16z companies
fs.readFile('./data/firms/a16z.txt', function (err, data) {
  if (err) throw err;

  const urls = data.toString().replace(/\r\n/g, '\n').split('\n');

  companyNames = urls
    .filter((url) => url != 'undefined')
    .map((url) => {
      let domain = new URL(url);
      let hostname = domain.host;
      let split = hostname.split('.');
      return split[split.length - 2];
    });

  companyNames.forEach((name) => {
    getJobData(name);
  });
});

// jobs.lever.com/companyname
// Get div class = posting

// boards.greenhouse.io/companyname
// Get div class = opening
