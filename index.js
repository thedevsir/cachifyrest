#!/usr/bin/env node

const charm = require('charm')();
const express = require('express');
const argv = require('minimist')(process.argv.slice(2));
const bodyParser = require('body-parser')
const app = express();

let analyze = require('./src/analyze');

charm.pipe(process.stdout);
charm.reset();

// Config
const port = argv.port || argv.p || 3110;
const timeout = argv.timeout || argv.t || 30000;
const cacheMaxAge = argv.cache || argv.c || 15 * 60 * 1000;

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

app.use('/:path*', async (req, res) => {

    analyze.requests.count.allToCacheServer++;

    const fetchRes = await fetch(req.originalUrl.substring(1), req.method, req.body, req.headers);

    analyze.responses.count.allFromCacheServer++;

    res.send(fetchRes)
});

app.listen(port, () => setInterval(_ => {

    charm.reset();
    charm.write(require('./src/console').print({
        port,
        timeout,
        cacheMaxAge,
    }));

}, 1000));

// process.on('SIGTERM', _ => {
//     console.log("Finished all requests");
//     process.exit(1);
// });

process.on('SIGINT', _ => {
    console.log(' Bye Bye ;) ');
    process.exit(1);
});