const router = require('express').Router(),
ProjectControler = require('../controllers/project')
const {check ,body, validationResult } = require('express-validator');

router.get('/result',ProjectControler.search)
router.get('/search',ProjectControler.searchForm)

router.get('/',ProjectControler.index3,ProjectControler.indexView)
//router.get('/test',MeetingControler.index,MeetingControler.indexView)
router.get('/search/:tid',ProjectControler.index4)
router.get('/home',ProjectControler.index,ProjectControler.indexView1)
router.get('/new',ProjectControler.new1)

router.post('/create',[
    check('title').isLength({min:2}).withMessage(' العنوان يجب ان يكون ثلاثة احرف على الأقل  ')
    .isLength({max:70}).withMessage(' العنوان تجاوز عدد الاحرف المسموح بها   '),

    check('shortDescription').isLength({min:20}).withMessage(' الوصف القصير يجب ان يكون ٢٠ حرف على الأقل  ')
    .isLength({max:150}).withMessage(' الوصف القصير تجاوز عدد الاحرف المسموح بها   '),

    check('description').isLength({min:150}).withMessage(' الوصف يجب ان يكون ١٥٠ حرف على الأقل  ')
    .isLength({max:300}).withMessage(' الوصف تجاوز عدد الاحرف المسموح بها   '),

    check('hours', 'meetings hours required').not().isEmpty(),

    check('seats', 'meetings hours required').not().isEmpty()


    ],ProjectControler.create,ProjectControler.redirectView)


 router.get('/:mid',ProjectControler.show,ProjectControler.showView)
//  router.get('/:mid/edit',MeetingControler.edit)
router.get('/:mid/edit',ProjectControler.edit1)
router.put('/:mid/update',ProjectControler.update,ProjectControler.redirectView)
router.delete('/:mid/delete',ProjectControler.delete,ProjectControler.redirectView)
module.exports = router;