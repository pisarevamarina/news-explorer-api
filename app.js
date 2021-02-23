const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { PORT, DB_URL } = require('./utils/config');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routers = require('./routes/index');
const notFound = require('./middlewares/not-found');
const errorHandler = require('./middlewares/error-handler');

const app = express()

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(requestLogger);
app.use(limiter);
app.use(routers);
app.use(errorLogger);
app.use(errors());
app.use(notFound);
app.use(errorHandler);

app.listen(PORT);
