require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 5500;


app.use(cors({
    origin: 'http://localhost:5500', 
    methods: ['GET', 'POST'],
}));

app.use(express.json());
app.use(express.static('dist'));

console.log("Loaded API Keys:");
console.log("GeoNames Username:", process.env.GEO_USERNAME);
console.log("Weatherbit:", process.env.WEATHER_API_KEY);
console.log("Pixabay:", process.env.PIXABAY_API_KEY);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/getKeys', (req, res) => {
    console.log("Received request for API keys"); 
    res.json({
      GEO_API_KEY: process.env.GEO_USERNAME,
      WEATHER_API_KEY: process.env.WEATHER_API_KEY,
      PIXABAY_API_KEY: process.env.PIXABAY_API_KEY,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});  
export default app;