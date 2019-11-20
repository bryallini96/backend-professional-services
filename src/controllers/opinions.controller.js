const Opinion = require('../models/Opinion');
const Request = require('../models/Request');
const opinionsCtrl = {};

opinionsCtrl.getOpinions = async (req, res) => {
    console.log("Getting all opinions created");
    const opinions = await Opinion.find(req.query).populate('request').populate('createdByUser');
    res.json(opinions);
};

opinionsCtrl.getMeOpinions = async(req, res) => {
    console.log("Getting postulates of user: " + req.userId);
    const opinions = await Opinion.find({createdByUser: req.userId}).populate('request').populate('createdByUser');
    res.json(opinions);
}

opinionsCtrl.getOpinion = async (req, res) => {
    console.log("Getting opinion with id: " + req.params.id);
    await Opinion.findById(req.params.id).populate('request').populate('createdByUser').then((opinion) => {
        res.json(opinion);
        console.log(opinion);
    }).catch((error) => {
        console.log("Opinion with id: " + req.params.id + " does not exists");
        res.status(404).json({message: "Opinion with id: " + req.params.id + " does not exists"});
    });
};

opinionsCtrl.createOpinion = async (req, res) => {
    console.log("Creating opinion");
    const { score, opinion, requestId } = req.body;
    const newOpinion = new Opinion({
        score: score,
        opinion: opinion,
        createdByUser: req.userId,
        request: requestId
    });
    await newOpinion.save().then(() => {
        res.json({message: 'Opinion created'});
    }).catch((error) => {
        console.log(error.message);
        res.status(400).json({message: error.message});
    });
};

module.exports = opinionsCtrl;
