const { Schema, model } = require('mongoose');
const requestSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['DRAFT', 'PUBLISHED', 'APPROVED', 'FINISHED'],
        default: 'DRAFT'
    },
    salary: Number,
    profile: {
        type: String,
        required: true
    },
    timeReminder: Date,
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
module.exports = model('Request', requestSchema);