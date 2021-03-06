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

const whitelist = ['http://localhost:3000', 'https://werinse.herokuapp.com/']
const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions))

// Routes
app.get('/ulle', (req, res) => res.status(200).json({
    message: 'Veliye',
    date: Date(),
    env: req.app.get('env')
}))

app.use('/api/v1/stores', require('./routes/stores.routes'));

const PORT = process.env.PORT || 27015;

app.listen(PORT, () => console.log(`on ${process.env.PORT} connected in ${process.env.NODE_ENV}`));


app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {}
    })
})