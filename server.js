const express = require('express');
const argv = require('minimist')(process.argv.slice(2));
const bodyParser = require('body-parser')
const app = express();

let analyze = require('./src/analyze');

// Config
const port = argv.port || argv.p || 3110;
const timeout = argv.timeout || argv.t || 30000;
const cacheMaxAge = argv.cache || argv.c || 10 * 365 * 24 * 60 * 60 * 1000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());
bodyParser.raw

app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

const fetch = require('./src/fetch')(timeout, cacheMaxAge);

app.get('/boot', async (req, res) => {

    res.json(analyze);
});

app.use('/:path*', async (req, res) => {

    analyze.requests.count.allToCacheServer++;

    const fetchRes = await fetch(req.originalUrl.substring(1), req.method, req.body, req.headers);

    analyze.responses.count.allFromCacheServer++;

    res.send(fetchRes)
});

app.listen(port);
