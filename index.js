#!/usr/bin/env node

const charm = require('charm')();
const express = require('express');
const argv = require('minimist')(process.argv.slice(2));
const app = express();

charm.pipe(process.stdout);
charm.reset();

// Config
const port = argv.port || argv.p || 3110;
const timeout = argv.timeout || argv.t || 30000;
const cacheMaxAge = argv.cache || argv.c || 15 * 60 * 1000;

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

const fetch = require('./src/fetch')(timeout, cacheMaxAge);

app.use('/:path*', async function (req, res) {

    const fetchRes = await fetch(req.originalUrl.substring(1), req.method, req.params, req.headers);

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