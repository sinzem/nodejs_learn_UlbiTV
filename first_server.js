// const http = require('http');

// const PORT = process.env.PORT || 5000;

// const server = http.createServer({}, (req, res) => { /* (создаем сервер, первый аргумент - опции настроек, второй cb-функция(req - запрос от клиента, res - ответ сервера)) */
//     // --------------------------
//     // res.writeHead(200, {
//     //     'Content-type': 'text/html; charset=utf-8'
//     // }) /* (заголовки - кодировка utf-8 позволит работать с кириллицей, text/html позволит передавать соотв. форматы данных) */
//     // res.end('<h1>Сервер работает!</h1>'); /* (пример ответа) */
//     // --------------------------
//     res.writeHead(200, {
//         'Content-type': 'application/json'
//     }) /* (указываем статус ответа и работу с приложениями) */
//     /* (пример работы сервера - на основании запроса из url-строки выводим нужные данные) */
//     if (req.url === '/users') {
//         return res.end(JSON.stringify([
//             {id: 1, name: 'Vasiliy'}
//         ]));
//     }
//     if (req.url === '/posts') {
//         return res.end('POSTS');
//     }
//     res.end(req.url);
// })

// server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// -----------------------------------------------------
/* (Пример с роутером) */
const http = require('http');
const EventEmitter = require('events');

const emitter = new EventEmitter();

const PORT = process.env.PORT || 5000;

/* (класс для создания эндпоинтов(методов обработки запросов)) */
class Router {
    constructor() {
        this.endpoints = {} /* (инициализируем изначально пустой обьект - в процессе из него должны получаться эндпоинты с ключем-путем и значением-обьектом, в котором будут ключ-метод и значение - cb-функция) endpoints = {path: {"/get": handler1, "/post": handler2}}*/
    }

    request(method = "GET", path, handler) { /* (по умолчанию будет метод get) */
        if (!this.endpoints[path]) { /* (если путь еще не занят, добавляем в него обьект) */
            this.endpoints[path] = {}
        }
        const endpoint = this.endpoints[path]; /* (переменная для сокращения пути) */

        if (endpoint[method]) { /* (проверяем по данному пути приходящий метод - если такой уже есть, выдаем ошибку) */
            throw new Error(`[${method}] по адресу ${path} уде существует`)
        }

        endpoint[method] = handler; /* (если метод еще не занят, ставим его ключем, а cb - значением) */
        emitter.on(`[${path}]:[${method}]`, (req, res) => {
            handler(req, res)
        }) /* (навешиваем обработчик на событие на основе получившегося обьекта) */
    }

    /* (обложки для каждого метода) */
    get(path, handler) {
        this.request('GET', path, handler);
    }
    post(path, handler) {
        this.request('POST', path, handler);
    }
    put(path, handler) {
        this.request('PUT', path, handler);
    }
    delete(path, handler) {
        this.request('DELETE', path, handler);
    }
}

const router = new Router();
/* (подключаем - передаем путь и cb) */
router.get('/users', (req, res) => {
    res.end('YOU SEND REQUEST TO /USERS')
})

router.get('/posts', (req, res) => {
    res.end('YOU SEND REQUEST TO /POST')
})

const server = http.createServer({}, (req, res) => {
    const emitted = emitter.emit(`[${req.url}]:[${req.method}]`, req, res); /* (на основе полученного запроса генерируем событие - запустит один из методов, созданных выше) */
    if (!emitted) {
        res.end(); /* (если запрос невалидный(путь неверно указан) - обязательно завершаем процесс) */
    }
})

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
/* (запуск - npm run start-first) */