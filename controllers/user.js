const User = require('../models/user');
const Project = require('../models/project');

const user = require('../models/user');
const { body, validationResult } = require('express-validator');
const passport = require('passport');


module.exports={
 index : (req , res , next) =>
User.find({})
.then(users=>{
    res.locals.users = users 
    next()
})
.catch(error => {
    next(error)
})
,
indexView : (req , res) => {
    res.render ('user/index');
},
redirectView: (req , res , next)=>{
let redirectPath = res.locals.redirect;
if(redirectPath)res.redirect(redirectPath);
else next ();
},
new : (req , res ) =>{  

    res.render('user/new')
    },
    insert:(req , res,next) => {
  let newUser= new User({
    name : req.body.name ,
    email : req.body.email ,
    field :  "تقنية",
    bio : req.body.bio ,
    userType: req.body.gridRadios  
    })
       
        User.register(
            User.register(newUser, req.body.password, (error, user) =>{
                if(user){
                    req.flash('success', 'تم حفظ البيانات بنجاح');
                    res.redirect('/projects/home');
                }else{
                    req.flash('error', `الرجاء التحقق من البيانات`);
                    res.redirect('/projects/home');
                }
            })
        ) }
 ,

    
    findOne: (req,res)=>{
        User.findById({_id:req.params.id})
        .then(user => {
            res.locals.user=user;
            res.render('user/edit')
         })
        .catch(error=>{
            console.log('Error fetching users.');
            next(error);
        });
    },
    editForm:(req,res)=>{
        res.render('user/editForm')
    },
    edit: (req,res,next)=>{
         
    


            const error= validationResult(req)
                 if(!error.isEmpty()){
                      res.json({error:error.array()})
                       
                 }

        User.updateOne({_id:req.params.id}, { 
            name :req.body.name,
             age :req.body.age,
             email:req.body.email }, 
             function (err, docs) { 
                 if (err){ 
                    req.flash('error', 'لم تتم العملية بنجاح')
                } 
                 else{ 
                 req.flash('success', 'تم حفظ التغييرات بنجاح!')
                 res.locals.redirect='/users'
                 next();
                 } 
        
        }); 
    },
    redirectView: (req,res,next)=>{
        let redirectPath=res.locals.redirect;
        if(redirectPath) {
        res.redirect(redirectPath)}
        else next();
    },

delete:(req,res,next)=>{
    User.findByIdAndDelete(req.params.id, function (err, docs) { 
        if (err){ 
            req.flash('error','فشلت عملية حذف المستخدم');
        } 
        else{ 
            req.flash('error','تم حذف المستخدم');
        } 
        res.locals.redirect='/users'
         next(); 
     }); 
},
show: (req,res)=>{
    //res.send('show user method');
    User.findById({_id:req.params.id})
    .then(user => {
        res.locals.user=user;
        res.render('user/show')
     })
    .catch(error=>{
        console.log('Error fetching users.');
    });
},
loginForm:(req,res)=>{
    res.render('user/signin-image')
},
signInForm:(req,res)=>{
    res.render('user/signIn')
},
login:(req,res,next)=>{
    User.findOne({email:req.body.email, password:req.body.password})
    .then(user => {
        if(user){
            req.flash('success','تم بنجاح تسجيل الدخول')
        req.session.user=user
        res.redirect('../users')
        }
        
        res.render('user/login')
        
     })
    .catch(error=>{
        console.log('Error fetching users.');
    });

},
authenticate: passport.authenticate('local',{
    successRedirect: '/projects/home',
    successFlash: ' تم تسجيل الدخول بنجاح، مرحباً بك في نظام Bizlnk',
    failureRedirect: '/users/login',
    failureFlash: 'الرجاء التحقق من بيانات الدخول'
}),
    validator:(req,res,next)=>{
        
        const error= validationResult(req)
        if(!error.isEmpty()){      
             res.json({error:error.array()})  
        }
        else{
            next();
        }
        
    } , 
    validate: (req, res, next) =>{
        let err = 0;
        body('name').isLength({min:2,max:25}).withMessage('Name must be at least 2 characters')
        body('bio').not().isEmpty();
        body('email').isEmail().trim();
        body('password').isLength({min:6}).withMessage('Password must be at least 6 characters');
            next();
    },
    logout: (req, res, next) =>{
        req.logout();
        req.flash('success', 'تم تسجيل الخروج بنجاح');
        res.locals.redirect = '/projects/home';
        next();
    },
    restrictAdmin: (req, res, next) =>{
        if (req.isAuthenticated() && req.user.isAdmin) {
            next();
        }else{
            req.flash('loginerror', 'عذراً! يجب تسجيل الدخول للوصول للصفحة');
            res.render('user/login');
        }
    },
    showProfile:(req, res) =>{
    User.findOne({_id:req.params.uid})
    .then(user => {
        res.locals.user=user;
        res.render('user/editprofile',user)
     })
    .catch(error=>{
        console.log('Error fetching users.');
    });

    },
    showProjects:(req, res) =>{
        Project.find({userId:"5f60d43cb2534f1972c0a951"}).then(projects=>{
            res.locals.projects = projects
            res.render('user/showProjects',projects)
        })
        .catch(error => {
            console.log('Error fetching project.');

        })
 }

}