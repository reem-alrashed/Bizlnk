const router = require('express').Router(),
    proposalsControler = require('../controllers/proposal')

router.get('/:pid/show', proposalsControler.showProjectProposals);
router.post('/:uid/:pid/submit', proposalsControler.submitProposal);


module.exports = router;