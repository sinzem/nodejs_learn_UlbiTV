// Стрим - беспрерывная передача данных частями до 64kb, чтобы при работе с обьемными файлами не зависала система. Бывают readable(чтение), writable(запись), duplex(чтение + запись), transform(чтение + запись + изменение по мере выполнения) 

const fs = require('fs');
const path = require('path');

/* (для примера считывания - файл test_stream.txt (~350kb)) */
// -----------------------
// fs.readFile(path.resolve(__dirname, 'test_stream.txt'), (err, data) => {
//     if (err) {
//         throw err;
//     }
//     console.log(data);
// }) /* (readFile считывает все одним куском - для больших файлов неудобно) */
// -----------------------
/* (приимер чтения со стримами) */
const stream = fs.createReadStream(path.resolve(__dirname, "test_stream.txt"), {}); /* (создаем стрим для чтения, в обьекте передаем опции, например кодировку) */
/* (работает по методу события - событие data позволит считывать файл, он считывается кусочкамит до 64kb(chunk), далее передаем cb-функцию, гле обрабатываем эти чанки) */
stream.on('data', (chunk) => {
    console.log(chunk);
})
stream.on('end', () => console.log("Чтение окончено"));
stream.on('open', () => console.log("Начало чтения"));
stream.on('error', (e) => console.log(e)); /* (обязательно подключаем ошибку) */

// -----------------------
/* (пример записи со стримами) */
const writableStream = fs.createWriteStream(path.resolve(__dirname, 'test_stream2.txt'));
for (let i = 0; i < 20; i++) {
    writableStream.write(i + '\n'); /* (записываем чанки) */
} 
writableStream.end(); /* (обязательно завершаем операцию, можно одним из методов ниже) */
// writableStream.close();
// writableStream.destroy();
writableStream.on('error', (e) => console.log(e));

// -----------------------
/* (пример http-запроса) */
const http = require('http');

http.createServer((req, res) => {
    /* (запросы также представляют собой стримы - req - readable stream, res - writable stream) */
    const stream = fs.createReadStream(path.resolve(__dirname, 'test_stream.txt'));
    /* (читаем из файла и возвращаем пользователю) */
    // stream.on('data', chunk => res.write(chunk))
    // stream.on('end', chunk => res.end())
    /* (в таком варианте разница в чтении-отдаче приведет к ошибке) */
    stream.pipe(res); /* (для res используют pipe - контролирует чтении-отдаче, не завершит процесс преждевременно) */
})











