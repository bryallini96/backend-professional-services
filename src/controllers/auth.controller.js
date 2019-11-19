const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');
const authCtrl = {};

authCtrl.signup =  async (req, res) => {
    try {
        const { firstName, lastName, email, password, profile, education, description, interest } = req.body;
        const userFind = await User.findOne({email: email});
        if(userFind) {
            console.log("email: " + email +  " is already registered");
            return res.status(400).json({message: "email: " + email +  " is already registered"});
        }
        const user = new User({
            firstName,
            lastName,
            email,
            password,
            profile,
            education,
            description,
            interest
        });
        user.password = await user.encryptPassword(user.password);
        await user.save().then(() => {
            const token = jwt.sign({id: user._id}, config.secret, {
                expiresIn: 60 * 60 * 2
            });
            res.json({auth: true, token});
            console.log("User: " + user._id + " created");
        }).catch((error) => {
            console.log(error.message);
            res.status(400).json({message: error.message});
        });
        
    } catch (e) {
        console.log(e);
        res.status(500).send('There was a problem registering your user');
    }
};

authCtrl.me = async (req, res) => {
    const user = await User.findById(req.userId, {password: 0});
    if(!user) {
        return res.status(404).send("No user found");
    }
    res.status(200).json(user);
};

authCtrl.signin =  async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email: email});
    if(!user) {
        return res.status(404).json({message: "The email does not exists"});
    }
    const validPassword = await user.validatePassword(password);
    if (!validPassword) {
        return res.status(401).json({auth: false, token: null});
    }

    const token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 60 * 60 * 2 
    });
    res.status(200).json({auth: true, token });
};

authCtrl.logout =  function(req, res) {
    res.status(200).send({auth: false, token: null});
};

authCtrl.getUsers = async (req, res) => {
    console.log("Getting all users created");
    const users = await User.find();
    res.json(users);
}

module.exports = authCtrl;