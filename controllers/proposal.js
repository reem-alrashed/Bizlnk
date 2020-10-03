const Proposal = require('../models/proposal');
const User = require('../models/user');

const mongoose = require("mongoose")

const { body } = require('express-validator');


module.exports={

    showProjectProposals: function(req, res){
        Proposal.find({projectId:req.params.pid}).find().populate({path:'userId',model:User})
        .exec(function(err, proposals) 
        {
           res.locals.proposals = proposals 
            User.find({}).then(users =>{
                res.locals.users = users;
                res.render('proposal/listOfProposals')
       })
       })
        },
       submitProposal:(req,res)=>{
           let userid=req.params.uid.trim();
           console.log(userid);
           console.log(req.params.pid);
           let projectid=mongoose.Types.ObjectId(req.params.pid)
      
        const proposal = new Proposal({
            userId:userid,
            projectId:mongoose.Types.ObjectId(projectid),
            approved: false
            
        })
        proposal.save(function (err) {
           if (err){

               console.log(err);
               req.flash('error','Error adding proposal');
               res.redirect("/projects/search")
             
           }

           else{ 
               req.flash('success','تم تقديم العرض');
               res.redirect("/projects/search")
               }

         })
         

}
}
