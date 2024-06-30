const mongoose = require('mongoose'); /* (модуль для работы с БД) */

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
}); /* (схема - в БД будут создаваться обьекты с этими полями + автоматически id и версия) */

module.exports = mongoose.model('User', userSchema); /* (экспортируем модель подключения, передаем название и схему(используем в user-controller.js)) */