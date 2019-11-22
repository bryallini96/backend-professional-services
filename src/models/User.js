const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'first name is required']
    },
    lastName: {
        type: String,
        required: [true, 'last name is required']
    },
    email: {
        type: String,
        required: [true, ' email is required'],
        trim: true,
        unique: true
    },
    password: {
        type: String, 
        required: [true, 'password is required'],
        minlength: 7
    },
    active: Boolean,
    profile: {
        type: String,
        required: [true, 'profile is required']
    },
    education: {
        type: String,
        required: [true, 'education is required']
    },
    description: String,
    interest: String
});

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

module.exports = model('User', userSchema);