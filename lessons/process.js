const dotenv = require('dotenv');
dotenv.config(); /* (подключение файла .env с переменными среды) */

process.pid; /* (id процесса) */
/* (команда kill и номер id в терминале остановит процесс) */

console.log(process.env.PORT);
console.log(process.env.NODE_ENV);
/* (при запуске кoмандой node ./lessons/process.js переменные среды возьмет из .env) */
/* (при запуске кoмандой npm run start-process переменные среды возьмет из сross-env из package.json) */

console.log(process.argv);
/* (при запуске кoмандой node ./lessons/process.js можно добавить через пробел любые переменные - argv покажет их) */

if (Math.random() > 0.5) {
    while (true) {

    } 
} else {
    console.log("Program completed");
    process.exit(); /* (пример остановки приложения вручную) */
}
