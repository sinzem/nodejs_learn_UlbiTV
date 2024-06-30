/* (класс для формирования эндпоинтов) */
module.exports = class Router {
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

        endpoint[method] = handler;
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