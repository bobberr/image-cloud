const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = mongoose.model('User', new Schema ({
    email: String,
    password: String,
    images: Array
}));

module.exports = User;