const { Schema, model } = require('mongoose');

const opinionSchema = new Schema({
    score: {
        type: Number,
        min: [1, 'The minimum score is 1'],
        max: [5, 'The maximum score is 5'],
        required: [true, 'score is required']
    },
    opinion: {
        type: String,
        required: [true, 'opinion is required']
    },
    request: [{
        type: Schema.Types.ObjectId,
        ref: 'Request'
    }]
});

module.exports = model('Opinion', opinionSchema);