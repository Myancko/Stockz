const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/api/google-drive', async (req, res) => {
    try {
      const drivePhotoId = req.query.id;
      const url = `https://drive.google.com/uc?export=view&id=${drivePhotoId}`;
  
      const response = await axios.get(url, { responseType: 'arraybuffer' });

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
      res.set('Content-Type', response.headers['content-type']);
      res.send(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).send(error.response?.data || 'Unknown error');
    }
  });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});