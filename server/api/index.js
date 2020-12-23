const { Router } = require('express');

const router = Router();

router.use('/transcript', require('./transcript'));
router.use('/audio', require('./audio'));

module.exports = router;
