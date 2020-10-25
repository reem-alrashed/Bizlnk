const mongoose = require("mongoose")
const { Schema } = require("mongoose")
const passportLocalMongoose = require('passport-local-mongoose');

UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        trim: true,
        required:true
    },
    field:{
        type: String,
        trim: true,
        required:true
    },
    isInvestor: Boolean,
    isAdmin: Boolean
})

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

module.exports = mongoose.model('User', UserSchema)

