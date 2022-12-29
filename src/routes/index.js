const router = require('express').Router();
const userRoute = require('./user');
const errorMiddleware = require('../middlewares/error');
router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.use('/user', userRoute);
router.use(errorMiddleware);

module.exports = router;