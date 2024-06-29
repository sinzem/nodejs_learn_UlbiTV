const Emitter = require('events'); /* (встроенный класс для работы с событиями) */

const emitter = new Emitter();

/* (создаем событие - метод on(вызывать можно много раз), как в eventListener - название события и cb-функция, в которую передаем любое количество аргументов) */
emitter.on('message', (data, second, third) => {
    console.log("You sent a message " + data);
    console.log("Second argument " + second);
})

const MESSAGE = process.env.message || "";
if (MESSAGE) { /* (переменная из env) */
    emitter.emit('message', MESSAGE, 123); /* (если переменная не пустая, emit генерирует событие - запускаем npm run start-event) */
} else {
    emitter.emit('message', "You didn't specify a message!");
}

const callback = (data) => {
    console.log(data);
}
emitter.once('message', callback);/* (once может быть вызвано только раз) */

// emitter.removeAllListeners(); /* (удалит все слушатели) */
emitter.removeListener('message', callback); /* (удалит cb-функцию на указанном слушателе) */