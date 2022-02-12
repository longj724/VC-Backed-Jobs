const fs = require('fs');

fs.appendFile('./test.txt', '\n\n new text', (err) => console.log(err));