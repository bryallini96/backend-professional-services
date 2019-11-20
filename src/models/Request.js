const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const requestSchema = new Schema({
    description: {
        type: String,
        required: [true, 'description is required']
    },
    activities: [{
        type: String,
        required: [true, 'at least one activity is required']
    }],
    status: {
        type: String,
        enum: ['PUBLISHED', 'IN-PROGRESS', 'APPROVED', 'FINISHED'],
        default: 'PUBLISHED'
    },
    salary: {
        type: Number,
        required: [true, 'salary is required']
    },
    currency: {
        type: String,
        enum: ['MXN', 'USD'], 
        required: [true, 'currency is required']
    },
    profile: {
        type: String,
        required: [true, 'profile is required']
    },
    address: {
        type: String,
        required: [true, 'address is required']
    },
    city: {
        type: String,
        required: [true, 'city is required']
    },
    laborDays: String,
    timeReminder: {
        type: Date,
        required: [true, 'Time reminder is required']
    },
    active: Boolean,
    observations: String,
    postulates: [{
        type: Schema.Types.ObjectId,
        ref: 'Postulate'
    }],
    createdByUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Request', requestSchema);