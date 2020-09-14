
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
    isAdmin: Boolean,
    field:{
        type: String,
        trim: true,
        required:true
    },
    breif: {
        type: String,
        trim: true,
        required:true
    }
    
})


UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

module.exports = mongoose.model('User', UserSchema)
