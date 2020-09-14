const mongoose = require("mongoose")
const { Schema } = require("mongoose")


ProjectSchema = new Schema ({
    userId: { type: Schema.Types.ObjectId, ref: 'User' }, 
    title: String,
    description: String,
    shortDescription: String,
    postedDate: Date,
    endDate: Date,
    requiredSkills: Array,
    
    numberOfStudents: Number
})


module.exports = mongoose.model('Project', ProjectSchema)