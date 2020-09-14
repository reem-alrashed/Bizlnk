
const mongoose = require("mongoose")
const { Schema } = require("mongoose")
const passportLocalMongoose = require('passport-local-mongoose');

ProposalSchema = new Schema({
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' }, 
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
    Prototype: Binary,
    approved:Boolean
})


module.exports = mongoose.model('Proposal', ProposalSchema)

