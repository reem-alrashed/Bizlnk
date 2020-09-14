
const mongoose = require("mongoose")

const { Schema } = require("mongoose")
const passportLocalMongoose = require('passport-local-mongoose');

TeamSchema = new Schema({
    supervisor:{
        name:{
            type: String,
            trim: true,
            required:true
        },
        email:{
            type: String,
            trim: true,
            required:true
        },
        major:{
            type: String,
            trim: true,
            required:true
        }
    },
    // members:{
    //     [
    //         {
    //             name:String,
    //         Email:String
    //     }
    //     ]
    // },
    university:{
        type: String,
        trim: true,
        required: true
    }
    
})


TeamSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

module.exports = mongoose.model('Team', TeamSchema)

