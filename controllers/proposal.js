const Proposal = require('../models/proposal');
const Project = require('../models/project');

const { body, validationResult } = require('express-validator');


module.exports={
 showProjectProposals : (req , res , next) =>
 Proposal.find({projectId:req.params.pid}).find().populate({path:'userId',model:User})
 .exec(function(err, proposals) 
 {
    res.locals.proposals = proposals 
     User.find({}).then(users =>{
         res.locals.users = users;
         res.locals.u = 0;
         res.render('/proposal/listOfProposals')
})}),
submitProposal:(req,res,next)=>{
    
}




}