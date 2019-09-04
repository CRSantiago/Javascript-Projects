const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB databaase connection established successfully');
})

const hoursRouter = require('./routes/hours');
const studentsRouter = require('./routes/students');

app.use('/hours', hoursRouter);
app.use('/students', studentsRouter);

app.listen(PORT, () => {
    console.log(`The server is running on port: ${PORT}`);
})