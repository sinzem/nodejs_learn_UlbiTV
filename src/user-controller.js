// const users = [
//     {id: 1, name: 'Alex'},
//     {id: 2, name: 'John'}
// ]; /* (для примера работы массив вместо БД) */
const User = require('./user-model'); /* (подключаем модель для работы с MongoDB) */

// ---------------------------
/* (Без MongoDB) */
// const getUsers = (req, res) => {
//     if (req.params.id) { /* (если в запросе пришел id, возвращаем обьект с соответствующим id из БД) */
//         return res.send(users.find(user => user.id == req.params.id))
//     }
//     // res.writeHead(200, {
//     //     'Content-type': 'application/json'
//     // })
//     // res.end(JSON.stringify(users));
//     res.send(users); /* (функция send из миддлвера parseJson проставляет заголовки и парсит json) */
// };

// const createUser = (req, res) => {
//      // console.log(req.body);
//      const user = req.body;
//      users.push(user); /* (добавляем body из запроса в массив(вместо бд в д.с) - работает только до перезагрузки) */
//      res.send(users);
// }

// ---------------------------------------------
/* (MongoDB - работаем с БД и методами MongoDB) */
const getUsers = async (req, res) => {
    let users; 
    if (req.params.id) {
        users = await User.findById(req.params.id); /* (получаем пользователя по id с помощью findById) */
    } else {
        users = await User.find(); /* (find получит всю базу) */
    }
    res.send(users); 
};

const createUser = async (req, res) => {
     const user = await User.create(req.body); /* (добавляем пользователя в DB с помощью create) */
     res.send(user);
}

module.exports = {
    getUsers,
    createUser
}