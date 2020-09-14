const mongoose = require("mongoose")
const { Schema } = require("mongoose")


ProjectSchema = new Schema ({
    userId: { type: Schema.Types.ObjectId, ref: 'User' }, 
    title: String,
    description: String,
    shortDescription: String,
    postedDate: Date,
    endDate: Date,
    budget:Number,
    type:String,
    requiredSkills: Array,  
    minNumOfStudents: Number
})


module.exports = mongoose.model('Project', ProjectSchema)