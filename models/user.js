const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Слишком короткое имя'],
      maxlength: [30, 'Слишком длинное имя'],
      required: [true, 'Обязательное поле'],
    },
    about: {
      type: String,
      minlength: [2, 'Слишком короткая запись'],
      maxlength: [30, 'Слишком длинная запись'],
      required: [true, 'Обязательное поле'],
    },
    avatar: {
      type: String,
      required: [true, 'Обязательное поле'],
      validate: {
        validator: (value) => validator.isURL(value),
        message: 'Введите ссылку',
      },
    },
    email: {
      type: String,
      required: [true, 'Обязательное поле'],
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: 'Введите верный формат для email',
      },
    },
    password: {
      type: String,
      required: [true, 'Обязательное поле'],
      minlength: [8, 'Слишком короткий пароль'],
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

userSchema.plugin(uniqueValidator, { message: 'Такой email уже существует' });

module.exports = mongoose.model('user', userSchema);
