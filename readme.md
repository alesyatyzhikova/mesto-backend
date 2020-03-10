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


###### Запросы для сервера: ######

* http://localhost:3000 - для главной страницы

* http://localhost:3000/cards - для получения json-списка всех карточек
* POST http://localhost:3000/cards - для создания карточки
* DELETE http://localhost:3000/cards/id - для удаления карточки
* PUT http://localhost:3000/cards/id/likes - поставить лайк
* DELETE http://localhost:3000/cards/id/likes - удалить лайк

* http://localhost:3000/users - для получения списка всех пользователей
* http://localhost:3000/users/id - для получения объекта пользователя с указанным id
* POST http://localhost:3000/users - создаем пользователя
* PATCH http://localhost:3000/users/me - обновляем информацию о пользователе
* PATCH http://localhost:3000/users/me/avatar - обновляем аватар пользователя

* http://localhost:3000/что_угодно - вернет ошибку со статусом 404 - ресурс не найден