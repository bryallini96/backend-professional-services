const Request = require('../models/Request');
const Postulate = require('../models/Postulate');
const requestsCtrl = {};

requestsCtrl.getRequests = async (req, res) => {
    console.log("Getting requests created filtering by");
    console.log(req.query);    
    const requests = await Request.find(req.query).populate('postulates').populate('createdByUser');
    res.json(requests);
};

requestsCtrl.getMeRequests = async (req, res) => {
    console.log("Getting requests of user: " + req.userId);
    const requests = await Request.find({createdByUser: req.userId}).populate('postulates').populate('createdByUser');
    res.json(requests);
}

requestsCtrl.getRequest = async (req, res) => {
    console.log("Getting request with id: " + req.params.id);
    await Request.findById(req.params.id).populate('postulates').populate('createdByUser').then((request) => {
        res.json(request);
        console.log(request);
    }).catch((error) => {
        console.log("Request with id: " + req.params.id + " does not exists");
        res.status(404).json({message: "Request with id: " + req.params.id + " does not exists"});
    });
};

requestsCtrl.createRequest = async (req, res) => {
    console.log("Creating request");
    const {description, salary, currency, laborDays, profile, address, city, timeReminder, activities} = req.body;
    const newRequest = new Request({
        description: description,
        status: 'PUBLISHED',
        salary: salary,
        currency: currency,
        laborDays: laborDays,
        profile: profile,
        address: address,
        city: city,
        timeReminder: timeReminder,
        activities: activities,
        active: true,
        createdByUser: req.userId
    });
    await newRequest.save().then(() => {
        res.json({message: 'Request created'});
    }).catch((error) => {
        console.log(error.message);
        res.status(400).json({message: error.message});
    });
};

requestsCtrl.updateRequest = async (req, res) => {
    console.log("Updating request with id: " + req.params.id);
    const {description, salary, currency, laborDays, profile, address, city, timeReminder, activities} = req.body;
    await Request.findById(req.params.id).then((request) => {
        request.description = description;
        request.salary = salary;
        request.currency = currency;
        request.laborDays = laborDays;
        request.profile = profile;
        request.address = address;
        request.city = city;
        request.timeReminder = timeReminder;
        request.activities = activities
        request.save().then(() => {
            console.log("Updated request with id: " + req.params.id);
            res.status(204).json({message: 'Request with id: ' + req.params.id + " updated"});
        }).catch((error) => {
            console.log(error.message);
            res.status(400).json({message: error.message});
        });
    }).catch((error) => {
        console.log("Request with id: " + req.params.id + " does not exists");
        res.status(404).json({message: "Request with id: " + req.params.id + " does not exists"});
    });
};

requestsCtrl.postulateInRequest = async (req, res) => {
    console.log("Postulate in request with id: " + req.params.id);
    await Request.findById(req.params.id).then((request) => {
        if (request.status === 'PUBLISHED' || request.status === 'IN-PROGRESS') {
            const newPostulate = new Postulate();
            newPostulate.request = request.id;
            newPostulate.createdByUser = req.userId;
            newPostulate.save();
            request.postulates.push(newPostulate);
            request.status = 'IN-PROGRESS';
            request.save();
            console.log('Postulated to Request with id: ' + req.params.id);
            res.status(201).json({message: 'Postulated to Request with id: ' + req.params.id});
        } else {
            console.log("Cannot postulate in a request with status: " + request.status);
            res.status(400).json({message: 'Cannot postulate in a request with status: ' + request.status});
        }      
    }).catch((error) => {
        console.log("Request with id: " + req.params.id + " does not exists");
        res.status(404).json({message: "Request with id: " + req.params.id + " does not exists"});
    });
};

requestsCtrl.rejectPostulate = async (req, res) => {
    await Postulate.findById(req.params.id).then((postulate) => {
        if (postulate.status === 'POSTULATE'){
            postulate.status = 'REJECTED';
            postulate.save();
            res.status(204).json({message: 'Postulate with id: ' + req.params.id + ' Updated to status: ' + postulate.status});
            console.log('Postulate with id: ' + req.params.id + ' Updated to status: ' + postulate.status);
        } else {
            console.log("Cannot reject postulate with id: " + req.params.id + " and status " + postulate.status);
            res.status(400).json({message: "Cannot reject postulate with id: " + req.params.id + " and status " + postulate.status});
        }
    }).catch((error) => {
        console.log("Postulate with id: " + req.params.id + " does not exists");
        res.status(404).json({message: "Postulate with id: " + req.params.id + " does not exists"});
    });
}

requestsCtrl.approvePostulate = async (req,res) => {
    await Postulate.findById(req.params.id).then((postulate) => {
        if(postulate.status === 'POSTULATE') {
            Request.findById(postulate.request).populate('postulates').then((request) => {
                if(request.status === 'IN-PROGRESS') {
                    request.postulates.map((postulateInRequest) => {
                        if(postulateInRequest.status === 'POSTULATE' && postulateInRequest.id != req.params.id) {
                            postulateInRequest.status = 'REJECTED';
                            postulateInRequest.save();
                        }
                    });
                    postulate.status = 'APPROVED';
                    postulate.save();
                    console.log('Postulate with id: ' + postulate.id + ' Updated to status: ' + postulate.status);
                    request.status = 'APPROVED';
                    request.save();
                    console.log('Request with id: ' + request.id + ' Updated to status: ' + request.status);
                    res.json({message: 'Postulate with id: ' + postulate.id + ' Updated to status: ' + postulate.status});
                } else {
                    console.log("Cannot approve postulate with id: " + req.params.id + " and status " + postulate.status + ' in Request with id: ' + request.id + ' and status' + request.status);
                    res.status(400).json({message: "Cannot approve postulate with id: " + req.params.id + " and status " + postulate.status + ' in Request with id: ' + request.id + ' and status' + request.status});
                }
            }).catch((error) => {
                console.log("Request with id: " + req.params.id + " does not exists");
                res.status(404).json({message: "Request with id: " + req.params.id + " does not exists"});
            })
        } else {
            console.log("Cannot approve postulate with id: " + req.params.id + " and status " + postulate.status);
            res.status(400).json({message: "Cannot approve postulate with id: " + req.params.id + " and status " + postulate.status});
        }
    }).catch((error) => {
        console.log("Postulate with id: " + req.params.id + " does not exists");
        res.status(404).json({message: "Postulate with id: " + req.params.id + " does not exists"});
    });
}

requestsCtrl.finishRequest = async (req, res) => {
    await Request.findById(req.params.id).populate('postulates').then((request) => {
        if(request.status === 'APPROVED') {
            request.status = 'FINISHED';
            request.save();
            console.log('Request with id: ' + request.id + ' Updated to status: ' + request.status);
            res.status(204).json({message: ""});
        } else {
            console.log("Cannot finished request with id: " + req.params.id + " and status " + request.status);
            res.status(400).json({message: "Cannot finished request with id: " + req.params.id + " and status " + request.status});
        }
    }).catch((error) => {
        console.log("Request with id: " + req.params.id + " does not exists");
        res.status(404).json({message: "Request with id: " + req.params.id + " does not exists"});
    });

}

module.exports = requestsCtrl;