const { Router } = require('express');
const passport = require('passport');
const operationRouter = require('./operations.js');
const categoryRouter = require('./categories.js');
const userRouter = require('./user.js');
// import operationRouter from './operations.js';
const auth = require('./auth');
const router = Router();

router.use('/operations', operationRouter);
router.use('/categories', categoryRouter);
router.use('/login', auth);
router.use('/users', userRouter);

module.exports = router;