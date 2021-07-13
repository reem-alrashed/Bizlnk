const express = require('express');
const layouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const router = require('./routes/index');
const methodOverride = require('method-override');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser')
const passport = require('passport')
const connectflash = require('connect-flash')
const User = require('./models/user');
const appPort = 3001;


app = express(); 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Taawon',{
    useNewUrlParser:true,
    useUnifiedTopology: true 
});


app.set('port', appPort);
app.set('view engine','ejs');
app.use(layouts);
app.use(express.static('public'));


app.use(methodOverride('_method',{methods:['POST','GET']}));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'))

app.use(cookieParser('team'))
app.use(expressSession ({secret: 'team',resave: false,saveUninitialized:false}))


/* Passport */
app.use(passport.initialize());
app.use(passport.session());


passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(connectflash());


 app.use((req , res , next) => {
res.locals.flashMessages= req.flash(); 
res.locals.loggedIn = req.isAuthenticated();
   res.locals.currentUser= req.user;
next()
 }) 


app.use('/',router);

 app.use((req,res,next)=>{
    if(req.session.user){
        console.log(req.session.user)
    }
    next()
})
app.listen(appPort,()=>{ 
      console.log(`Server has started on port ${appPort}`);
});
