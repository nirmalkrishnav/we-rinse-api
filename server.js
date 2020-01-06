const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

const app = express();

//body parser
app.use(express.json());

connectDB();

//cors
app.use(cors());

// Routes
app.get('/ulle', (req, res) => res.send('veliye'))

app.use('/api/v1/stores', require('./routes/stores.routes'));

const PORT = process.env.PORT || 27015;

app.listen(PORT, () => console.log(`on ${process.env.PORT} connected in ${process.env.NODE_ENV}`));
