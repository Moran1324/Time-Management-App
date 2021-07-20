const { Router } = require('express');

const router = Router();

router.use('/transcript', require('./transcript'));
router.use('/audio', require('./audio'));
router.use('/auth', require('./auth'));

module.exports = router;
