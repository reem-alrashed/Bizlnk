const router = require('express').Router()
const proposalsControler =require('../controllers/proposal')
const { body } = require('express-validator');


router.get('/:pid/show' , proposalsControler.showProposals)
router.post('/:pid/:uid/submit' , proposalsControler.submitProposals)


module.exports = router;