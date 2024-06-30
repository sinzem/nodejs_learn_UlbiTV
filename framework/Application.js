const http = require('http');
const EventEmitter = require('events');

/* (класс для создания сервера и работы с событием) */
module.exports = class Application {
    constructor() {
        this.emitter = new EventEmitter();
        this.server = this._createServer();
        this.middlewares = []; /* (массив для миддлверов) */
    }

    use(middleware) {
        this.middlewares.push(middleware)
    } 

    listen(port, callback) {
        this.server.listen(port, callback);
    } /* (слушатель порта) */

    // endpoint = {
    //     './users': {
    //         'GET': handler,
    //         'POST': handler2
    //     }
    // } (структура эндпоинта в классе Router)

    addRouter(router) { /* (добавляем эндпоинты) */
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path];
            Object.keys(endpoint).forEach((method) => {
                this.emitter.on(this._getRouteMask(path, method), (req, res) => {
                    const handler = endpoint[method];
                    handler(req, res);
                })
            })
        })
    }

    _createServer() { /* (создаем сервер) */
        return http.createServer((req, res) => {
            let body = '';  /* (cоздаем body для post-запроса, складываем в него чанки) */
            req.on('data', (chunk) => {
                body += chunk;
            })
            req.on('end', () => {
                if (body) {
                    req.body = JSON.parse(body);
                }
                this.middlewares.forEach(middleware => middleware(req, res)); /* (при создании эндпоинта перебираем миддлверы и запускаем каждый) */ 
                const emitted = this.emitter.emit(this._getRouteMask(req.pathname, req.method), req, res); 
                if (!emitted) {
                    res.end(); 
                }
            })
        })
    }

    _getRouteMask(path, method) {
        return `[${path}]:[${method}]`;
    } /* (функция для выделения названия события(по названию пути и метода)) */
}