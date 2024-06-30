const users = [
    {id: 1, name: 'Alex'},
    {id: 2, name: 'John'}
]; /* (для примера работы массив вместо БД) */

const getUsers = (req, res) => {
    if (req.params.id) { /* (если в запросе пришел id, возвращаем обьект с соответствующим id из БД) */
        return res.send(users.find(user => user.id == req.params.id))
    }
    // res.writeHead(200, {
    //     'Content-type': 'application/json'
    // })
    // res.end(JSON.stringify(users));
    res.send(users); /* (функция send из миддлвера parseJson проставляет заголовки и парсит json) */
};

const createUser = (req, res) => {
     // console.log(req.body);
     const user = req.body;
     users.push(user); /* (добавляем body из запроса в массив(вместо бд в д.с) - работает только до перезагрузки) */
     res.send(users);
}

module.exports = {
    getUsers,
    createUser
}