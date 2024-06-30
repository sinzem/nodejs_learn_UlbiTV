const userRouter = require('./src/user-router'); 
const Application = require('./framework/Application');
const jsonParser = require('./framework/parseJson');
const parseUrl = require('./framework/parseUrl');

const PORT = process.env.PORT || 5000;

const app = new Application();

app.use(jsonParser); /* (добавляем миддлверы при генерации эндпоинта) */
app.use(parseUrl('http://localhosct:5000')); /* (миддлвер для получения query-параметров, передаем в него baseUrl) */

app.addRouter(userRouter); /* (cоздаем роутеры) */

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
/* (запуск - npm run start) */