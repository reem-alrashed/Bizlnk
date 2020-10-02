const express = require('express');
const httpStatusCodes = require('http-status-codes');
const layouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const router = require('./routes/index');
const methodOverride = require('method-override');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser')
const passport = require('passport')
const connectflash = require('connect-flash')
const User = require('./models/user');


app = express(); 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Taawon',{
    useNewUrlParser:true,
    useUnifiedTopology: true,});
    mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


app.set('port',3001);
app.set('view engine','ejs');
app.use(layouts);
app.use(express.static('public'));


app.use(methodOverride('_method',{methods:['POST','GET']}));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cookieParser('team'))
app.use(expressSession ({
  secret: 'team',
  resave:false,
  saveUninitialized:false
}))


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
//if(req.isAuthenticated()){
   res.locals.currentUser= req.user;
  // res.locals.currentUser= req.session.currentUser;
//}
//else{
  //  res.locals.currentUser = undefined
//}
next()
 }) 


app.use('/',router);

 app.use((req,res,next)=>{
    if(req.session.user){
        console.log(req.session.user)
    }
    next()
})
app.listen(app.get('port'),()=>{ 
      console.log('Express has started..');
});
