const { Router } = require('express');

const operationRouter = require('./operations.js');
const categoryRouter = require('./categories.js');
const userRouter = require('./user.js');
// import operationRouter from './operations.js';
const router = Router();

router.use('/operations', operationRouter);
router.use('/categories', categoryRouter);
router.use('/users', userRouter);

module.exports = router;