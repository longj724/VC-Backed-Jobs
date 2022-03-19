const router = require('express').Router();
const axios = require('axios');
require('dotenv').config();

router.get('/location-options/:input', async (req, res) => {
  let input = req.params.input;
 
  let config = {
    method: 'get',
    url:
      'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' +
      input +
      '&types=geocode&key=' +
      process.env.GOOGLE_API_KEY,
    headers: {},
  };

  let options = await axios(config);
  let data = await options.data;
  res.json(data);
});

module.exports = router;
