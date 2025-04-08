require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/api/veryfi', async (req, res) => {
  try { 
    const { file_url } = req.body;
    const response = await axios.post(
      'https://api.veryfi.com/api/v8/partner/documents',
      {
        file_url: file_url
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'CLIENT-ID': process.env.VERYFI_CLIENT_ID,
          'AUTHORIZATION': `apikey ${process.env.VERYFI_USERNAME}:${process.env.VERYFI_API_KEY}`
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
