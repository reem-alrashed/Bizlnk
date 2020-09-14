const router = require('express').Router()
const userControler =require('../controllers/user')
const { body } = require('express-validator');
const passport = require('passport');

router.get('/' , userControler.index , userControler.indexView)
router.get('/login' , userControler.loginForm)
router.post('/login', userControler.authenticate);
router.get('/logout', userControler.logout, userControler.redirectView);
router.get('/new' , userControler.new  )
router.post('/insert' ,userControler.validate,userControler.validator ,userControler.insert )
router.get('/:id/update',userControler.findOne,userControler.editForm);
router.put('/:id/edit',userControler.validate,userControler.edit,userControler.redirectView);
router.get('/:id/show',userControler.show);
router.delete('/:id/delete',userControler.delete,userControler.redirectView);
router.get('/login',userControler.loginForm);
router.post('/login',userControler.validate,userControler.validator,userControler.login);

module.exports = router;