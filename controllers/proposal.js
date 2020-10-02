const Proposal = require('../models/proposal');
const User = require('../models/user');

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
           console.log(req.params.uid);
           let userid=req.params.uid;
           console.log(req.params.pid);
           let projectid=req.params.pid
      
        const proposal = new Proposal({
            userId: userid,
            projectId:projectid,
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
