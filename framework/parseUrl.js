/* (миддлвер для получения полного пути - нужен для получения query-параметров, из req получаем неполный путь, поэтому добавляем baseUrl) */
module.exports = (baseUrl) => (req, res) => {
    const parsedUrl = new URL(req.url, baseUrl); /* (обьект из полного пути, по ключу searchParams находятся query-параметры) */
    const params = {};
    parsedUrl.searchParams.forEach((value, key) => params[key] = value); 
    /* (перебираем searchParams, query-параметры помещаем в req) */
    req.pathname = parsedUrl.pathname; 
    req.params = params;
}