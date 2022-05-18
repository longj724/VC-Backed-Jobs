#!/bin/bash

# Clear folders
rm -rf data/boards/gh/*
rm -rf data/boards/lever/*
rm -rf data/openings/gh/*
rm -rf data/openings/lever/*

# Scrape websites
node ./scrapers/a16z.js
node ./scrapers/accel.js
node ./scrapers/bessemer.js
node ./scrapers/greycroft.js
node ./scrapers/canaan.js


# Modify database
node ./db/getGh.js
node ./db/getLever.js
