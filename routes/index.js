const router = require('express').Router()
UserRoutes = require('./user')
ProjectRoutes = require('./project')


router.use('/users',UserRoutes)
router.use('/projects',ProjectRoutes)

module.exports = router;
