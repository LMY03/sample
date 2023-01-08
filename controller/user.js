const User = require('../model/user');
const crypto = require('./crypto');

const user = {
    addUser: async function(req, res) {
        var usernameInput = req.body.usernameInput;
        var passwordInput = req.body.passwordInput;

        arr = crypto.encryption(passwordInput);

        User.create({ username: usernameInput, password: arr[0], iv: arr[1]}, 
            function(err) {
                if(err) {
                    console.log("Register Failed");
                    res.redirect('/register');
                }
                else {
                    console.log("Register Success");
                    res.redirect('/');
                }
        });
    },
    login: async function(req, res) {
        var usernameInput = req.body.usernameInput;
        var passwordInput = req.body.passwordInput;

        var user = await User.findOne({username: usernameInput});

        User.find({username: usernameInput}, 
            function(err) {
                if (err) {
                    console.log(err);
                    res.redirect('/login');
                } else {
                    if (user) {
                        if (crypto.decryption(user.iv, user.password) == passwordInput) {
                            console.log('Login Success');
                            res.redirect('/home');
                        } else {
                            console.log("Invalid Login");
                            // req.flash('errorMsg', 'INVALID LOGIN');
                            res.redirect('/');
                        }
                    } else{ //If User does not exist
                        console.log('Username not found');
                        // req.flash('errorMsg', 'USERNAME NOT FOUND');
                        res.redirect('/login');
                    }
                }
        });
    },
}

module.exports = user;