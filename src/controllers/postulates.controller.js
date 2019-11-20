const Postulate = require('../models/Postulate');
const postulatesCtrl = {};

postulatesCtrl.getPostulates = async(req, res) => {
    console.log("Getting all postulates created");
    const postulates = await Postulate.find(req.query).populate('createdByUser');
    res.json(postulates);
}

postulatesCtrl.getMePostulates = async(req, res) => {
    console.log("Getting postulates of user: " + req.userId);
    const postulates = await Postulate.find({createdByUser: req.userId}).populate('request');
    res.json(postulates);
}

postulatesCtrl.getPostulate = async (req, res) => {
    console.log("Getting postulate with id: " + req.params.id);
    await Postulate.findById(req.params.id).populate().populate('createdByUser').then((postulate) => {
        res.json(postulate);
        console.log(postulate);
    }).catch((error) => {
        console.log("Postulate with id: " + req.params.id + " does not exists");
        res.status(404).json({message: "Postulate with id: " + req.params.id + " does not exists"});
    });
};

module.exports = postulatesCtrl;