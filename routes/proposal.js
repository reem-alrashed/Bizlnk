const router = require('express').Router()
const proposalsControler =require('../controllers/proposal')
const { body } = require('express-validator');


router.get('/' , proposalsControler.showProposals)
router.post('/' , proposalsControler.submitProposals)



module.exports = router;