const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const fs = require('fs');
const axios = require('axios');
const path = require('path');

dotenvExpand.expand(dotenv.config({ path: './.env' }));

const app = express();
const port = process.env.PORT || 4567;
const author = "Jan Drewienkowski";
const timestamp = new Date().toISOString();

// Zapisz log do pliku
fs.writeFileSync('log_startu.txt', `Start: ${timestamp}\nAutor: ${author}\nPort: ${port}\n`);

app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint z danymi pogodowymi
app.post('/pogoda', async (req, res) => {
  const { kraj, miasto } = req.body;
  const apiKey = process.env.OWM_KEY;

  try {
    const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${miasto},${kraj}&appid=${apiKey}&units=metric&lang=pl`);
    res.status(200).json(result.data);
  } catch (err) {
    res.status(400).json({ blad: "Nie udało się pobrać danych pogodowych." });
  }
});

app.listen(port, () => {});
