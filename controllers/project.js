
const User = require('../models/user');
const Attend = require('../models/project')
const httpStatusCodes = require('http-status-codes');
const Proposal = require('../models/proposal');

const {check ,body, validationResult } = require('express-validator');
const Project = require('../models/project');



module.exports ={
    index3:(req,res)=>{
        console.log("\n\n\n\n\n\n")
        Project.find().populate({path:'userId',model:User})
        .exec(function(err, projects) 
        {
            res.locals.projects = projects;
            User.find({}).then(users =>{
                res.locals.users = users;            
            res.render("project/index")
        })
    })
      },
      indexHome:(req,res)=>{
        Project.find().populate({path:'userId',model:User})
        .exec(function(err, projects) 
        {
            res.locals.projects = projects;
            User.find({}).then(users =>{
                res.locals.users = users;
                res.locals.u = 0;
            
            res.render("home")
        })
    })
      }
      ,index4:(req,res)=>{
      
        Project.find({_id:req.params.pid}).then(project=>{
            res.locals.project = project 
        render('project/search') 
           })
        .catch(error => {
            console.log('Error')
            next(error)
        })
    },
     
    index2:(req,res,next)=>{
        Meeting.findOne({}).populate('themeId').exec(function (err, meeting) {
            if (err) return handleError(err);
           
                console.log('The theme title is %s', meeting.themeId.title)
                next()
          });
    }
    ,
    index:(req,res,next)=>{
        Meeting.find({})
        .then(meetings =>{
            res.locals.meetings = meetings;
            next();
            }).catch(error =>{
           console.log('Error fetching meetings. ');
            next(error)
        });
    }
    ,
    indexView:(req,res)=>{
        res.render("project/index")
    }
        ,
        indexView1:(req,res)=>{
            res.render('/meetings1');
        },
        respondJON:(req,res)=>{
            res.json({status:httpStatusCodes.OK,
            data:res.locals.meetings});},
    new:(req,res)=>{

            res.render('project/new');},    
            new1:(req,res)=>{
                Theme.find({})
                .then(themes =>{
                    res.locals.themes = themes;
                    User.find({}).then(users=>{
                        res.locals.users = users; 
                        res.render('meetings/addMeeting');
                    })
                    }).catch(error =>{
        console.log('Error fetching themes. ');
        next(error)
                });
                },

    redirectView:(req,res,next)=>{
                

                let redirectPath=res.locals.redirect;
                console.log(redirectPath)
                if(redirectPath) res.redirect(redirectPath);
                else next();
              },
              create:(req,res,next)=>{
                  let date_ob = new Date();
                  let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();

// current seconds
let seconds = date_ob.getSeconds();
let currentDate= year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;


                const first = new Project({
                     userId: req.params.id,
                     title: req.body.title,
                     postedDate: currentDate,
                     budget: req.body.budget,
                     type: req.body.type,
                     description: req.body.description,
                     requiredSkills: req.body.requiredSkills,
                     minNumOfStudents: req.body.minNumOfStudents
 })
                first.save(function (err) {
                    if (err){
                        req.flash('error','Error adding project');
                        res.redirect("project/index")
                        next(error);
                    }

                    else{ 
                        req.flash('success','تمت اضافة المشروع بنجاح');
                        res.redirect("project/index")
                        next() }

                  }) },
                  delete:(req,res,next)=>{
                    Project.deleteOne({_id:req.params.mid},function(err){
                        if(err){
                            console.log(err)
                        }
                        else{
                            console.log("one project has deleted")
                     }
                     
                    })
                    req.flash('error','تم حذف الإجتماع بنجاح');
                    res.locals.redirect='/meetings/index'
                    next();
                },
                    
                    show:(req,res,next)=>{
                        let projectId= req.params.mid
                        Project.findOne({_id:projectId})
                        .then(project =>{
                            res.locals.project =project
                            res.render('project/showProject');
                        })
                        .catch(error =>{
                            console.log('Error fetching projects. ');
                            next(error)
                        })
                    },    showView:(req,res)=>{
                        res.render('show-project');},
                  edit:(req,res)=>{
                    let meetingId= req.params.mid
                    Meeting.findOne({_id:meetingId})
                      .then(meeting =>{
                          res.locals.meeting =meeting
                          res.render('meetings/editMeeting',meeting);
                      })
                      .catch(error=>{
                          res.send('Error fetching meetings');
                      });
                },
                edit1:(req,res)=>{
                    let projectId= req.params.mid
                    Project.find({_id:projectId})
                .then(projects =>{
                    res.locals.projects = projects;
                    res.render('project/edit');
                    }).catch(error =>{
                   console.log('Error fetching projects. ');
                    next(error)
                });
                   
                    },
                update:(req,res,next)=>{
                    let date_ob = new Date();
                    let date = ("0" + date_ob.getDate()).slice(-2);
  
  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  
  // current year
  let year = date_ob.getFullYear();
  
  // current hours
  let hours = date_ob.getHours();
  
  // current minutes
  let minutes = date_ob.getMinutes();
  
  // current seconds
  let seconds = date_ob.getSeconds();
  let currentDate= year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
  
  
  Project.updateOne({_id:req.params.mid},{
                       title: req.body.title,
                       postedDate: currentDate,
                       budget: req.body.budget,
                       description: req.body.description,
                       requiredSkills: req.body.requiredSkills,
                       minNumOfStudents: req.body.minNumOfStudents
                        },function(err){
                        if(err){
                            console.log(err)
                        }
                        else{
                            req.flash('success', 'تم حفظ التغييرات بنجاح!')
                            res.redirect("project/index")
                        }

                })

            }
            
            ,
            searchForm:(req,res)=>{
                Project.find({})
                .then(projects =>{
                    res.locals.projects = projects;
                    res.render('project/search');
                    }).catch(error =>{
                   console.log('Error fetching projects. ');
                    next(error)
                });
            },
            
            search: (req,res)=>{
                Project.find({_id:req.params.pid})
                    .then(projects =>{
                        res.locals.projects = projects;
                        console.log(projects);
                    res.render("project/searchCard")
                })
                .catch(error=>{
                    res.send('Error fetching projects');
                });
              },


              validate:(req,res,next)=>{
                check('hours').custom(value => {
                      if (value > 24) {
                        throw new Error('meeting hours more than 24 not allowed');
                        console.log('meeting hours more than 24 not allowed');
                      }
                      }),
                check('seats').custom(value => {
                        if (value < 2) {
                          throw new Error('seats less than 2 not allowed');
                        }
                    
                  })
            }
            ,
        restrictAdmin: (req, res, next) =>{
            console.log('is authenticated?: ' + req.isAuthenticated()); 
            if (req.isAuthenticated() && req.user.isAdmin) {
                next();
            }else{
                req.flash('loginerror', 'عذراً! يجب تسجيل الدخول للوصول للصفحة');
                res.render('user/login');
            }
        },

    showProjectProposals : function(req, res){
        Proposal.find({projectId:req.params.pid}).find().populate({path:'userId',model:User})
        .exec(function(err, proposals) 
        {
           res.locals.proposals = proposals 
            User.find({}).then(users =>{
                res.locals.users = users;
                res.render('/proposal/listOfProposals')
       })
       })
        },
       submitProposal:function(req, res){
           const proposal = new Proposal({
               userId:req.params.uid,
              projectId:req.params.pid
       })
          first.save(function (err) {
              if (err){
                  req.flash('error','Error adding proposal');
                  res.render("project/search")

              }
       
              else{ 
                  req.flash('success','تم تسليم العرض بنجاح');
                  res.render("project/search")
                 }
       
            })
       }

        }