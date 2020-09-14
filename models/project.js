const mongoose = require("mongoose")
const { Schema } = require("mongoose")


ProjectSchema = new Schema ({
    userId: { type: Schema.Types.ObjectId, ref: 'User' }, 
    title: String,
    description: String,
    postedDate: Date,
    budget:Number,
    type:String,
    requiredSkills: Array,  
    minNumOfStudents: Number
})


module.exports = mongoose.model('Project', ProjectSchema)