const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const https = require('https');


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'weather.html'));
});

app.get('/api/weather/:city', async (req, res) => {
    try {
        const city = req.params.city;
        const apiKey = 'f3d78da060b33489531b35fb18e34378';
        const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await axios.get(weatherUrl);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).send('Error fetching weather data');
    }
});

app.listen(port, () => {
    console.log('Server is running on localhost');
});