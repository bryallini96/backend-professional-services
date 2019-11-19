const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');
const authCtrl = {};

authCtrl.signup =  async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({
            username,
            email,
            password
        });
        user.password = await user.encryptPassword(user.password);
        await user.save();
        const token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 60 * 60 * 2
        });
        res.json({auth: true, token});
    } catch (e) {
        console.log(e);
        res.status(500).send('There was a problem registering your user');
    }
};

router.get('', async (req, res, next) => {
    const users = await User.find();
    res.json(users);

});

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
        return res.status(404).send("The email does not exists");
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

module.exports = authCtrl;