const router = require('express').Router()
UserRoutes = require('./user')
ProjectRoutes = require('./project')

router.use('/home',(req,res)=>{res.render('home')})

router.use('/users',UserRoutes)
router.use('/projects',ProjectRoutes)

module.exports = router;
