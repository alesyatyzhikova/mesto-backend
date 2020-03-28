const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Слишком короткое имя'],
      maxlength: [30, 'Слишком длинное имя'],
      required: [true, 'Обязательное поле'],
    },
    link: {
      type: String,
      required: [true, 'Обязательное поле'],
      validate: {
        validator: (value) => validator.isURL(value),
        message: 'Введите ссылку',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Обязательное поле'],
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      default: [],
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('card', cardSchema);
