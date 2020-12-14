const { Router } = require('express');

const router = Router();

router.use('/transcript', require('./transcript'));

module.exports = router;
