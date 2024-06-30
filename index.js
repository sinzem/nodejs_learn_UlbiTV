require('dotenv').config(); /* (подключение .env) */
const userRouter = require('./src/user-router'); 
const Application = require('./framework/Application');
const jsonParser = require('./framework/parseJson');
const parseUrl = require('./framework/parseUrl');
const mongoose = require('mongoose'); /* (модуль для работы с Mongo) */

const PORT = process.env.PORT || 5000;
const PASSWORD = process.env.MONGO_PASSWORD;

const app = new Application();

app.use(jsonParser); /* (добавляем миддлверы при генерации эндпоинта) */
app.use(parseUrl('http://localhosct:5000')); /* (миддлвер для получения query-параметров, передаем в него baseUrl) */

app.addRouter(userRouter); /* (cоздаем роутеры) */

const start = async () => { /* (для раоты с БД сервер оборачиваем в асинхронную функцию) */
    try {
        await mongoose.connect(`mongodb+srv://sinzem:${PASSWORD}@cluster0.linefxl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`); /* (с помощью connect подключаем MongoDb, строку подключения генерирует на MongoDb при создании кластера) */
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); /* (слушатель на сервере) */
    } catch (e) {
        console.log(e);
    }
}

start();

/* (запуск - npm run start) */