Mesto  Node.js/MongoDB
==============

### Проектная работа с созданием сервера и базой данных MongoDB express.js ###


###### Для работы использовала: ######

* HTML
* CSS
* JavaScript (ES6, modules)
* Node.js
* Express.js
* MongoDB


###### Для установки и запуска проекта локально необходимо: ######

* Установить Node.js (если не установлено)
* Клонировать репозиторий: git clone https://github.com/alesyatyzhikova/mesto-webpack.git
* Установить зависимости: npm init => npm install
* Запустить сервер командой npm run start
* Для автоматической перезагрузки сервера использовать команду npm run dev
* Для автоматического запуска приложения после падение через crash-test использовать команду pm2 start app.js --watch


###### Запросы для сервера: ######

* http://localhost:3000 - для главной страницы

* POST http://localhost:3000/signup - создание пользователя
* POST http://localhost:3000/signin - авторизация поьзователя

* http://localhost:3000/cards - для получения json-списка всех карточек
* POST http://localhost:3000/cards - для создания карточки
* DELETE http://localhost:3000/cards/id - для удаления карточки
* PUT http://localhost:3000/cards/id/likes - поставить лайк
* DELETE http://localhost:3000/cards/id/likes - удалить лайк

* http://localhost:3000/users - для получения списка всех пользователей
* http://localhost:3000/users/id - для получения объекта пользователя с указанным id
* POST http://localhost:3000/users - создаем пользователя
* PATCH http://localhost:3000/users/id -А обновляем информацию о пользователе
* PATCH http://localhost:3000/users/id/avatar - обновляем аватар пользователя

* GET http://localhost:3000/crash-test - краш тест приложения

* https://api.mestnet.tk/ - обратиться к серверу
* https://mestnet.tk/ - обратиться к фронту

* http://localhost:3000/что_угодно - вернет ошибку со статусом 404 - ресурс не найден
