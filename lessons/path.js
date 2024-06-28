const path = require('path');

/* (__dirname выдаст путь к директории с исполняемым документом) */
/* (".." позволябт вернуться на директорию назад) */
console.log(path.join(__dirname, '..', '..')); /* (join соединит путь, правильно отработает, несмотря на разделитель в данной системе(слеши не ставим)) */
const fullpath = path.resolve(__dirname, "first", "second", "third.js"); /* (resolve соединит путь, отработает и без dirname, слеши не ставим) */
console.log(path.parse(fullpath)); /* (распарсит(разделит на составные) путь) */
console.log(path.sep); /* (выдаст разделитель в данной системе) */
console.log(path.isAbsolute('first/second')); /* (проверка на абсолютный путь) */
console.log(path.basename(fullpath)); /* (выдаст имя исполняемого документа) */
console.log(path.extname(fullpath)); /* (расширение файла) */

// ----------------------------------------

const siteURL = `http://localhost:8080/users?id=5123`;

const url = new URL(siteURL); /* (создаст обьект из запроса - распарсит на составляющие) */

console.log(url);
