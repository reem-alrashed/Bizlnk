const User = require('../models/user');
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
    console.log('Error')
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
    insert:(req , res) => {
    User.insertMany({
    name : req.body.name ,
    email : req.body.email ,
    password : req.body.password ,
    gender : req.body.gender ,
    bio : req.body.bio ,
    
    })
       
User.register(newUser, req.body.password, (error, user) =>{
        if(user){
            req.flash('success', 'تم حفظ البيانات بنجاح');
            res.locals.redirect = '/users';
            next();
        }else{
            req.flash('error', `الرجاء التحقق من البيانات`);
            res.locals.redirect = '/users/new';
            next();
        }
    });
    req.flash('success' ,  ' تم اضافه المستخدم بنجاح !')
    res.redirect('/users')
    },findOne: (req,res)=>{
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
                 console.log("Updated User"); 
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
            console.log(err) 
            req.flash('error','فشلت عملية حذف المستخدم');
        } 
        else{ 
            console.log("Deleted "); 
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
    res.render('user/login')
},
login:(req,res,next)=>{
 

       const error= validationResult(req)
            if(!error.isEmpty()){
                
                 res.json({error:error.array()})

                  
}

    User.findOne({email:req.body.email, password:req.body.password})
    .then(user => {
        if(user){
            req.flash('success','تم بنجاح تسجيل الدخول')
        req.session.user=user
        //console.log(req.session.user)
        res.redirect('../meetings')
        }
        
        res.render('user/login')
        
     })
    .catch(error=>{
        console.log('Error fetching users.');
    });

},
authenticate: passport.authenticate('local',{
    failureRedirect: '/users/login',
    failureFlash: 'الرجاء التحقق من بيانات الدخول',
    successRedirect: '/users',
    successFlash: 'تم تسجيل الدخول بنجاح'
}),
    validator:(req,res,next)=>{
        
        const error= validationResult(req)
        if(!error.isEmpty()){
                      
             res.json({error:error.array()})
              
        }else{next();}
        
    } , 
    validate: (req, res, next) =>{
        let err = 0;
        console.log(body);
        body('name').isLength({min:2,max:25}).withMessage('Name must be at least 2 characters')
        body('bio').not().isEmpty();
        body('email').isEmail().trim();
        body('password').isLength({min:6}).withMessage('Password must be at least 6 characters');
            next();
    },
    logout: (req, res, next) =>{
        req.logout();
        req.flash('success', 'تم تسجيل الخروج بنجاح');
        res.locals.redirect = '/users';
        next();
    },
    restrictAdmin: (req, res, next) =>{
        console.log('is authenticated?: ' + req.isAuthenticated()); 
        if (req.isAuthenticated() && req.user.isAdmin) {
            next();
        }else{
            req.flash('loginerror', 'عذراً! يجب تسجيل الدخول للوصول للصفحة');
            res.render('user/login');
        }
    }

    /* 
        validator:(req,res)=>{
        const error= validationResult(req)
        if(!error.isEmpty()){
            req.flash('error','أدخل بيانات صحيحة')
            res.redirect('/users/new')
                      
            // res.json({error:error.array()})
            // next();
        }

    }*/


}