const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
/* const corsHandler = require('../middlewares/corsHandler'); */
const { NotFoundError } = require('../utils/NotFoundError');

// роут для регистрации пользователя
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login/* , corsHandler */);
// роут для авторизации пользователя
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri()
      .regex(/https?:\/\/(www.)?[\w\-.~:/?#[\]@!$&'()*+,;=]{1,256}\.[a-z0-9]{2,6}\b([-\w()@:%.+~#=//?&]*)/),
  }),
}), createUser/* , corsHandler */);

// авторизация
router.use(auth/* , corsHandler */);

router.use(usersRoutes/* , corsHandler */);
router.use(cardsRoutes/* , corsHandler */);

// oбработка неправильного пути
router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
