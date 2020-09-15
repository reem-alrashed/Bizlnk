const router = require('express').Router()
const userControler =require('../controllers/user')
const { body } = require('express-validator');
const passport = require('passport');


router.get('/' , userControler.index , userControler.indexView)
router.get('/login' , userControler.loginForm)
router.get('/signIn' , userControler.signInForm)
router.post('/login', userControler.authenticate);

router.get('/logout', userControler.logout, userControler.redirectView);
router.get('/:uid/profile' , userControler.showProfile)
router.get('/:uid/projects' , userControler.showProjects)

router.get('/new' , userControler.new  )
router.post('/insert' ,userControler.insert,userControler.redirectView )
router.get('/:id/update',userControler.findOne,userControler.editForm);
router.put('/:id/edit',userControler.validate,userControler.edit,userControler.redirectView);
router.get('/:id/show',userControler.show);
router.delete('/:id/delete',userControler.delete,userControler.redirectView);
router.get('/login',userControler.loginForm);
router.post('/login',userControler.validate,userControler.validator,userControler.login);

router.get('/flash',(req, res) =>{
    res.locals.flashMessages = req.flash();
    req.flash('success', 'تم تسجيل الخروج بنجاح');
    res.redirect('users/index')
})

module.exports = router;