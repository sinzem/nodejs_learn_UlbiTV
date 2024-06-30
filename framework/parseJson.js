/* (мидллвер для проставления заголовков в эндпоинтах и обработки json, подключаем в index.js) */
module.exports = (req, res) => {
    res.send = (data) => {
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(JSON.stringify(data));
    }
}