const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Ошибка валидации',
      details: errors.array().map(err => ({
        field: err.param,
        message: err.msg,
        value: err.value
      }))
    });
  }
  next();
};

// Login validation
const validateLogin = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Имя пользователя должно быть от 3 до 50 символов')
    .isAlphanumeric()
    .withMessage('Имя пользователя должно содержать только буквы и цифры'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Пароль должен быть не менее 8 символов')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву и одну цифру')
    .custom((password) => {
      const commonPasswords = ['password', '123456', 'admin', 'qwerty', 'letmein'];
      if (commonPasswords.includes(password.toLowerCase())) {
        throw new Error('Этот пароль слишком распространен и легко угадывается');
      }
      return true;
    }),

  handleValidationErrors
];

// Post creation validation
const validatePost = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Заголовок должен быть от 1 до 255 символов')
    .escape(),  // ✅ XSS PROTECTION - ESCAPES HTML CHARACTERS

  body('content')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Содержание обязательно')
    .escape(),  // ✅ XSS PROTECTION - ESCAPES HTML CHARACTERS

  handleValidationErrors
];

module.exports = {
  validateLogin,
  validatePost,
  handleValidationErrors
};