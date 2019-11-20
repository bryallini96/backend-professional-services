const express = require('express');
const app = express();
const cors = require('cors');

// settings 
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api', require('./routes/requests'));
app.use('/api', require('./routes/postulates'));
app.use('/api', require('./routes/opinions'));
app.use('/api', require('./routes/auth'));
app.use('/api/currency', require('./routes/currency'));

module.exports = app;