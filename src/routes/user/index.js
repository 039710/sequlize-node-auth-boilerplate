const router = require('express').Router();
const UserController = require('../../controller/user');
const upload = require('../../middlewares/multer');
const auth = require('../../middlewares/auth');
router.post('/register', upload.single('avatar'), UserController.register);
router.post('/login', UserController.login);
router.use(auth);
router.get('/', UserController.index);



module.exports = router;