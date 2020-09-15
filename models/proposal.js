
const mongoose = require("mongoose")
const { Schema } = require("mongoose")
const passportLocalMongoose = require('passport-local-mongoose');

ProposalSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' }, 
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
    approved:Boolean
})


module.exports = mongoose.model('Proposal', ProposalSchema)

