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
       submitProposal:function(req, res){
      
                let proposal = new Proposal({
                    userId:req.params.uid,
                   projectId:req.params.pid
                })
                   proposal.save(function (err) {
                //    if (err){
                //        req.flash('error','Error adding proposal');
                //        res.redirect("/projects/search")
                //    }
                //    else{ 
                       req.flash('success','تم تسليم العرض بنجاح');
                       res.redirect("/projects/search")
                  //    }
            
                 })
                }
              
           
       
      

       

}
