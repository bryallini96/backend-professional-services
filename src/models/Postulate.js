const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const postulateSchema = new Schema({
    status:{
        type: String,
        enum: ['POSTULATE', 'APPROVED', 'REJECTED'],
        default: 'POSTULATE'
    },
    request: {
        type: Schema.Types.ObjectId,
        ref: 'Request',
        required: true
    },
    createdByUser: {
        type:Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Postulate', postulateSchema);