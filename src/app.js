const express = require('express');
const app = express();
const cors = require('cors');

// settings 
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/requests', require('./routes/requests'));
app.use('/api/postulates', require('./routes/postulates'));
app.use('/api/opinions', require('./routes/opinions'));
app.use('/api', require('./routes/auth'));

module.exports = app;