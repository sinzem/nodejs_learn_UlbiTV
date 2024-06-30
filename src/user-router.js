const Router = require('../framework/Router');
const controller = require('./user-controller');

/* (создаем эндпоинты на базе класса Router, подключаем в index.js) */
const router = new Router();

/* (cb-функции вынесли в user-controller.js) */
router.get('/users', controller.getUsers)

router.post('/users', controller.createUser)

module.exports = router;