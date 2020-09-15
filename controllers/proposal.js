const Proposal = require('../models/proposal');
const Project = require('../models/project');

const { body, validationResult } = require('express-validator');


module.exports={
 showProjectProposals : (req , res ) =>{
 Proposal.find({projectId:req.params.pid}).find().populate({path:'userId',model:User})
 .exec(function(err, proposals) 
 {
    res.locals.proposals = proposals 
     User.find({}).then(users =>{
         res.locals.users = users;
         res.render('/proposal/listOfProposals')
})})
 },
submitProposal:(req,res,next)=>{
    const proposal = new Proposal({
        userId:req.params.uid,
       projectId:req.params.pid
})
   first.save(function (err) {
       if (err){
           req.flash('error','Error adding proposal');
           res.render("project/search")
           next(error);
       }

       else{ 
           req.flash('success','تم تسليم العرض بنجاح');
           res.render("project/search")
           next() }

     })
}




}