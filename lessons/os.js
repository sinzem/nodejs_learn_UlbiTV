const os = require("os"); /* (встроенный модуль для работы с операционной системой) */
const cluster = require('cluster'); /* (модуль для запуска дочерних процессов на отдельных ядрах) */

// console.log(os.platform()); /* (определит систему) */
// console.log(os.arch()); /* (определит архитектуру процессора) */
// console.log(os.cpus()); /* (информация по ядрам) */
// console.log(os.cpus().length); /* (количество ядер) */

// -----------------------
/* (пример запуска процессов) */
if (cluster.isMaster) { /* (если процесс главный, запускаем дочерние) */
    for (let i = 0; i < os.cpus().length /* - 1 */; i++) { /* (перебираем ядра) */
        cluster.fork(); /* (запускаем работу) */
    } 
    cluster.on('exit', (worker) => { /* (навешиваем обработчик события на прекращение работы) */
        console.log(`Воркер с pid = ${worker.process.pid} умер`);
        if (code === 500) { /* (условие - перезапустить процесс или оставить завершенным) */
            cluster.fork();
        } else {
            console.log('Воркер умер...');
        }
        
    })
} else { /* (выводит отчет от работе процессов с id(командой kill и номер id можем вручную остановить процесс(из другого терминала))) */
    console.log(`Воркер с pid = ${process.pid} запущен`);

    setInterval(() => {
        console.log(`Воркер с pid = ${process.pid} еще работает`);
    }, 5000);
}
