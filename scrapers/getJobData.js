const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const {
  writeDataToFile,
  appendDataToFile,
} = require('../utils/fileOperations.js');
const { findSync } = require('@prisma/client/runtime');

module.exports.getJobData = async (name) => {
  // Try Lever
  let leverUrl = 'https://jobs.lever.co/' + name;
  let success = true;

  let res = await axios
    .get(leverUrl)
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      console.log('lever - writing to files');
      if (
        fs.existsSync('./data/boards/lever/' + name + '.txt') ||
        fs.existsSync('./data/boards/gh/' + name + '.txt')
      ) {
        return;
      }

      writeDataToFile('./data/boards/lever/' + name + '.txt', data);

      const $ = cheerio.load(data);
      const openings = $('.posting');
      openings.each((_, opening) => {
        appendDataToFile(
          './data/openings/lever/' + name + '.txt',
          $(opening).html()
        );
        appendDataToFile('./data/openings/lever/' + name + '.txt', '\n')
      });
    })
    .catch((err) => {
      let message =
        typeof err.response !== 'undefined'
          ? err.response.data.message
          : err.message;
      success = false;
      console.log(name + ' not on Lever');
      return message;
    });

  if (success) {
    return;
  } else {
    // Try greenhouse
    let greenhouseUrl = 'https://boards.greenhouse.io/' + name;

    res = await axios
      .get(greenhouseUrl)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        console.log('greenhouse - writing to files');

        writeDataToFile('./data/boards/gh/' + name + '.txt', data);

        const $ = cheerio.load(data);
        const openings = $('.opening');
        openings.each((_, opening) => {
          appendDataToFile(
            './data/openings/gh/' + name + '.txt',
            $(opening).html()
          );
        });
      })
      .catch((err) => {
        let message =
          typeof err.response !== 'undefined'
            ? err.response.data.message
            : err.message;

        console.log(name + ' not on greenhouse');
        return message;
      });
  }
};
