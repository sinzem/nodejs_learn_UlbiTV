const crypto = require('crypto'); /* (встроенный модуль для шифрования) */

const start = Date.now();
/* (операции для примера загрузки потоков) */
crypto.pbkdf2('123yrt', '5', 1000000, 64, 'sha512', () => {
    console.log('1 end', Date.now() - start);
})
crypto.pbkdf2('123yrt', '5', 1000000, 64, 'sha512', () => {
    console.log('2 end', Date.now() - start);
})
crypto.pbkdf2('123yrt', '5', 1000000, 64, 'sha512', () => {
    console.log('3 end', Date.now() - start);
})
crypto.pbkdf2('123yrt', '5', 1000000, 64, 'sha512', () => {
    console.log('4 end', Date.now() - start);
})
crypto.pbkdf2('123yrt', '5', 1000000, 64, 'sha512', () => {
    console.log('5 end', Date.now() - start);
})
/* (некоторые библиотеки могут работать многопоточно - в д.с Libuv выполняет 4 операции одновременно(первые четыре выполнились почти одновременно), следующие начинают обрабатываться в освободившихся потоках) */
/* (С 11 версии node потоками можно управлять с помощью модуля worker_threads) */