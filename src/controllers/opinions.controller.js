const Opinion = require('../models/Opinion');
const Request = require('../models/Request');
const opinionsCtrl = {};

opinionsCtrl.getOpinions = async (req, res) => {
    console.log("Getting all opinions created");
    const opinions = await Opinion.find().populate('request');
    res.json(opinions);
};

opinionsCtrl.getOpinion = async (req, res) => {
    console.log("Getting opinion with id: " + req.params.id);
    await Opinion.findById(req.params.id).then((opinion) => {
        res.json(opinion);
        console.log(opinion);
    }).catch((error) => {
        console.log("Opinion with id: " + req.params.id + " does not exists");
        res.status(404).json({message: "Opinion with id: " + req.params.id + " does not exists"});
    });
};

opinionsCtrl.createOpinion = async (req, res) => {
    console.log("Creating opinion");
    const { score, opinion } = req.body;
    const newOpinion = new Opinion({
        score: score,
        opinion: opinion,
    });
    await newOpinion.save().then(() => {
        res.json({message: 'Opinion created'});
    }).catch((error) => {
        console.log(error.message);
        res.status(400).json({message: error.message});
    });
};

module.exports = opinionsCtrl;
