#!/bin/bash

node ./scrapers/a16z.js
node ./scrapers/accel.js

node ./db/getGh.js
node ./db/getLever.js
