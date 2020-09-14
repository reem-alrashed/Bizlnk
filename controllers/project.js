
const User = require('../models/user');
const Attend = require('../models/attende')
const httpStatusCodes = require('http-status-codes');
const attend = require('./attend');

const {check ,body, validationResult } = require('express-validator');
const project = require('../models/project');



module.exports ={
    index3:(req,res)=>{
        console.log("\n\n\n\n\n\n")
        Project.find().populate({path:'userId',model:user})
        .exec(function(err, Project) 
        {
            res.locals.projects = projects;
            User.find({})
            .then(users =>{
                res.locals.users = users;
                res.locals.u = 0;
            
            res.render("index")})
    })
      }
      ,index4:(req,res)=>{
      
        project.find({userId:req.params.tid}).populate({path:'userId',model:User}).exec(function(err, meetings) {
            res.locals.meetings = meetings;
            User.find({})
            .then(users =>{
                res.locals.users = users;
                res.locals.u = 0;
            
            res.render("index")})
      });},
     
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
        res.render('home');},
        indexView1:(req,res)=>{
            res.render('meetings/meetings1');},
        respondJON:(req,res)=>{
            res.json({status:httpStatusCodes.OK,
            data:res.locals.meetings});},
    new:(req,res)=>{

            res.render('meetings/addMeeting');},    
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


                
                let latitude = req.body.latitude
                let longitude= req.body.longitude
                let userId= req.body.userId
                let title= req.body.title
                let startAt= req.body.startAt
                let hours= req.body.hours
                let themeId= req.body.themeId
                let description= req.body.description
                let from= req.body.from
                let to= req.body.to
                let shortDescription= req.body.shortDescription
                let seats= req.body.seats
                const first = new Meeting({
                    latitude: latitude,
                    longitude: longitude,
                    userId:userId,
                    title:title,
                    description:description,
                    startAt:startAt,
                    hours:hours,
                    themeId:themeId,
                    from:from,
                    to:to,
                    shortDescription:shortDescription,
                    seats:seats
 })
                first.save(function (err) {
                    if (err){
                        req.flash('error','Error adding meeting');
                        res.locals.redirect='/meetings/home'
                        next(error);
                    }

                    else{ 
                        req.flash('success','تم اضافة الإجتماع بنجاح');
                        res.locals.redirect= '/meetings/home'
                       next() }

                  }) },
                  delete:(req,res,next)=>{
                    Meeting.deleteOne({_id:req.params.mid},function(err){
                        if(err){
                            console.log(err)
                        }
                        else{
                            console.log("one meeting has deleted")
                                           }
                     
                    })
                    req.flash('error','تم حذف الإجتماع بنجاح');
                    res.locals.redirect='/meetings/home'
                    next();
                },
                    
                    show:(req,res,next)=>{
                        let meetingId= req.params.mid
                        Meeting.findOne({_id:meetingId})
                        .then(meeting =>{
                            res.locals.meeting =meeting
                            next()
                        })
                        .catch(error =>{
                            console.log('Error fetching meetings. ');
                            next(error)
                        })
                    },    showView:(req,res)=>{
                        res.render('show-meeting');},
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
                    let meetingId= req.params.mid
                    Meeting.findOne({_id:meetingId}).populate('userId','name').
                    exec(function (err, meeting) {
                        if (err) return handleError(err);
                        res.locals.meeting =meeting
                        User.find({}).then(users=>{
                            res.locals.users = users; 
                            console.log(users)
                        res.render('meetings/editMeeting',meeting);
                      });
                })},
                update:(req,res,next)=>{
                    let latitude = req.body.latitude
                    let longitude= req.body.longitude
                    let userId= req.body.userId
                    let title= req.body.title
                    let startAt= req.body.startAt
                    let hours= req.body.hours
                    let seats= req.body.seats
                    let description= req.body.description
                    let from= req.body.from
                    let to= req.body.to
                    let shortDescription= req.body.shortDescription  
                    console.log(''+userId)
                Meeting.updateOne({_id:req.params.mid},{ 
                        latitude: latitude,
                        longitude: longitude,
                        userId:userId,
                        title:title,
                        description:description,
                        startAt:startAt,
                        hours:hours,
                        seats:seats,
                        from:from, 
                        shortDescription:shortDescription,
                        to:to},function(err){
                        if(err){
                            console.log(err)
                        }
                        else{
                            req.flash('success', 'تم حفظ التغييرات بنجاح!')
                            res.locals.redirect= '/meetings/home'
                            next()
                        }

                })

            }
            
            ,searchForm:(req,res)=>{
                res.render('search');
            },

            search: (req,res)=>{
                Meeting.find({title:req.query.value})
                    .then(meetings =>{
                        res.locals.meetings = meetings;
                        console.log(meetings)
                    res.render("searchCards")
                })
                .catch(error=>{
                    res.send('Error fetching meetings');
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
        }




        }