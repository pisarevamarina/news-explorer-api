const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { PORT, JWT_SECRET, DB_URL } = require('./utils/config');

const app = express(DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.connect()

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());


app.listen(PORT);
