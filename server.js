const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const CHANNEL_ID = '@your_channel_username_or_id';

app.post('/send', async (req, res) => {
  const { name, surname, phone, workplace } = req.body;

  const message = `
📋 Yangi forma yuborildi:
👤 Ismi: ${name}
👥 Familiyasi: ${surname}
📞 Telefon: ${phone}
🏢 Ish joyi: ${workplace}
  `;

  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHANNEL_ID,
      text: message
    });

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log('Server ishga tushdi: http://localhost:3000');
});
