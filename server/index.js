require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDatabase = require('./config/db');
const authController = require('./controllers/authController');

const app = express();

app.use(express.json());

app.use(cors());


app.get("/", (req, res) => {
    res.send("Welcome to Nike ")
})
app.use('/users', authController)
const PORT = 8080;

app.listen(PORT, () => {
    try {
        connectDatabase();
        console.log('Server is listening...')
    } catch (err) {
        console.log(err);
    }
})