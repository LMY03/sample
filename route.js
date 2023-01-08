const express = require('express');
const app = express();
const main = require('./controller/main');
const user = require('./controller/user');

// Controller Javascript Files

// Home Page
app.get('/home', main.loadHome);

// Login Page
app.get('/', main.loadLogin);
app.get('/Login', main.loadLogin);
app.post('/verify', user.login);

// Register
app.get('/register', main.loadRegister);
app.post('/createuser', user.addUser);

module.exports = app;