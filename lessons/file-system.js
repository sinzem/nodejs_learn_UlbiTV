const fs = require('fs'); /* (встроенный модуль для работы с файловой системой) */
const path = require('path');

// Методы бывают асинхронные и синхронные(с окончанием Synk)

// --------------
// fs.mkdirSynk(path.resolve(__dirname, 'dir')); (mkdirSynk создаст по указанному пути папку, если такая уже есть - выдаст ошибку!)
// --------------
// fs.mkdirSynk(path.resolve(__dirname, 'dir', 'dir2', 'dir3'), {recursive: true}); (c этой опцией создаст рекурсивно вложенные папки)
// --------------
// fs.mkdir(path.resolve(__dirname, 'dir'), (err) => {
//     if (err) {
//         console.log(err);
//         return;
//     } 
//     console.log('Folder created');
// }); /* (пример асинхронной функции) */
// --------------
// fs.rmdir(path.resolve(__dirname, 'dir'), (err) => {
//     if (err) {
//        throw err;
//     } 
// }); /* (rmdir удалит указанную директорию) */
// --------------
// fs.writeFile(path.resolve(__dirname, 'test.txt'), "Hello World 1 2 3 !\n", (err) => {
//     if (err) {
//         throw err;
//     } 
//     console.log('File is recorded');
// }); /* (writeFile создаст файл(test.txt) и запишет/перезапишет в него данные("Hello...")) */
// // --------------
// fs.appendFile(path.resolve(__dirname, 'test.txt'), "New string", (err) => {
//     if (err) {
//         throw err;
//     } 
//     console.log('File is recorded');
// }); /* (appendFile дозапишет данные в конец файла) */

// --------------
/* (Примеры с промисами) */
const writeFileAsync = async (path, data) => { /* (создание/запись/перезапись файла) */
    return new Promise((resolve, reject) => fs.writeFile(path, data, (err) => {
        if (err) {
            return reject(err.message);
        }   
        resolve();
    }))
}

const appendFileAsync = async (path, data) => { /* (добавление информации в конец файла) */
    return new Promise((resolve, reject) => fs.appendFile(path, data, (err) => {
        if (err) {
            return reject(err.message);
        } 
        resolve();
    }))
}

const readFileAsync = async (path) => { /* (чтение из файла(добавляем кодировку, иначе вернет нечитабельную буферную строку)) */
    return new Promise((resolve, reject) => fs.readFile(path, {encoding: 'utf-8'}, (err, data) => {
        if (err) {
            return reject(err.message);
        }   
        resolve(data); /* (возвращает считанную строку) */
    }))
}

const removeFileAsync = async (path) => { /* (удаление) */
    return new Promise((resolve, reject) => fs.rm(path, (err) => {
        if (err) {
            return reject(err.message);
        }   
        resolve(console.log('File deleted')); 
    }))
}

writeFileAsync(path.resolve(__dirname, 'test.txt'), 'Hello World!\n')
    .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), '123\n'))
    .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), '456\n'))
    .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), '789\n'))
    .then(() => readFileAsync(path.resolve(__dirname, 'test.txt')))
    .then(data => console.log(data))
    .then(() => removeFileAsync(path.resolve(__dirname, 'test.txt')))
    .catch(err => console.log(err))

// -----------------------------
const text = process.env.TEXT || '';

writeFileAsync(path.resolve(__dirname, 'text.txt'), text) /* (создает файл с текстом из text) */
    .then(() => readFileAsync(path.resolve(__dirname, 'text.txt'))) /* (читает его) */
    .then(data => data.split(' ').length) /* (разбивает на массив, считает длинну) */
    .then(count => writeFileAsync(path.resolve(__dirname, 'count.txt'), `Word count: ${count}`)) /* (создает документ с указанием длинны) */
    .then(() => removeFileAsync(path.resolve(__dirname, 'text.txt'))) 
    .catch(err => console.log(err))
    /* (запуск -  npm run start-file (в package.json через cross-env передаем значение для text)) */

