const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/user', require('./routes/user'));
app.use('/api/post', require('./routes/post'));
app.use(require('./routes/jobs'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
