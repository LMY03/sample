const User = require('../model/user');

const main = {
    loadLogin: async function(req, res) {
        res.render('index');
    },
    loadHome: async function(req, res) {
        res.render('home', { username: "admin" });
    },
    loadRegister: async function(req, res) {
        res.render('register');
    }
};

module.exports = main;