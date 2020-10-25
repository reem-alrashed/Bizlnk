const router = require('express').Router(),
UserRoutes = require('./user')
ProjectRoutes = require('./project')
ProposalRoutes = require('./proposal')

router.use('/users',UserRoutes)
router.use('/projects',ProjectRoutes)
router.use('/proposals',ProposalRoutes)

module.exports = router;
