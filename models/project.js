const mongoose = require("mongoose")
const { Schema } = require("mongoose")


ProjectSchema = new Schema ({
    userId: { type: Schema.Types.ObjectId, ref: 'User' }, 
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    postedDate: Date,
    budget:{
        type: Number,
        trim: true,
        required: true
    },
    type:{
        type: String,
        trim: true,
        required: true
    },
    requiredSkills: Array,  
    minNumOfStudents: {
        type: Number,
        trim: true,
        required: true
    }
})


module.exports = mongoose.model('Project', ProjectSchema)