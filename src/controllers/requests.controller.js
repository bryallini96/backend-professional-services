const requestsCtrl = {};
const Request = require('../models/Request');

requestsCtrl.getRequests = async (req, res) => {
    const requests = await Request.find();
    res.json(requests);
};

requestsCtrl.getRequest = async (req, res) => {
    const request = await Request.findById(req.params.id).then((request) => {
        console.log(request);
        res.json(request);
    }).catch((error) => {
        console.log("Request with id: " + req.params.id + " does not exists");
        res.status(404);
        res.json("Request with id: " + req.params.id + " does not exists");
    });
};

requestsCtrl.createRequest = async (req, res) => {
    const {description, salary, profile, address, city, timeReminder} = req.body;
    const newRequest = new Request({
        description: description,
        status: 'DRAFT',
        salary: salary,
        profile: profile,
        address: address,
        city: city,
        timeReminder: timeReminder,
        active: true
    });
    await newRequest.save();
    res.json('Request created');
}

module.exports = requestsCtrl;