const router = require('express').Router()
UserRoutes = require('./user')


router.use('/users',UserRoutes)

module.exports = router;
