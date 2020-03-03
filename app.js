const express = require('express');
const path = require('path');

const cards = require('./routes/cards');
const users = require('./routes/users');
const notFound = require('./routes/notFound');

const { PORT = 3000 } = process.env;

// Init express
const app = express();

app.listen(PORT);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Get all cards
app.use('/cards', cards);

// Get all users or single user
app.use('/users', users);

// Error not found
app.use(notFound);
