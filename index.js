#!/usr/bin/env node
const os = require('os');
const https = require('https');
const chalk = require('chalk');
const Table = require('cli-table');
const express = require('express');
const axios = require('axios');
const cacheAdapter = require('axios-cache-adapter');
const argv = require('minimist')(process.argv.slice(2));
const app = express();

// Funcs
function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

// Get IPs
let tableServerAddresses = new Table({
    chars: {
        'top': '',
        'top-mid': '',
        'top-left': '',
        'top-right': '',
        'bottom': '',
        'bottom-mid': '',
        'bottom-left': '',
        'bottom-right': '',
        'left': '',
        'left-mid': '',
        'mid': '',
        'mid-mid': '',
        'right': '',
        'right-mid': '',
        'middle': ' '
    },
    style: {
        'padding-left': 2,
        'padding-right': 0
    }
});
let ifaces = os.networkInterfaces();

tableServerAddresses.push({
    local: 'localhost',
}, {
    local: '127.0.0.1',
}, );

Object.keys(ifaces).forEach(function (ifname) {

    let alias = 0;
    ifaces[ifname].forEach(function (iface) {

        if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
        }

        if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            tableServerAddresses.push({
                [ifname + ':' + alias]: iface.address
            });
        } else {
            // this interface has only one ipv4 adress
            tableServerAddresses.push({
                [ifname]: iface.address
            });
        }

        ++alias;
    });
});

// Config
const port = argv.port || argv.p || 3110;
const timeout = argv.timeout || argv.t || 30000;
const cacheMaxAge = argv.cache || argv.c || 15 * 60 * 1000;

const fetchCache = cacheAdapter.setup({
    cache: {
        maxAge: cacheMaxAge,
    },
});

async function fetch(url, method, data, headers) {

    const request = {
        method,
        url,
        data,
        headers,
        timeout,
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        }),
    };

    try {

        const response = await fetchCache(request);

        return response.data;

    } catch (error) {
        console.log(error);

    }
}

app.use('/:path*', async function (req, res) {

    const fetchRes = await fetch(req.originalUrl.substring(1), req.method, req.params, req.headers);

    res.send(fetchRes)
});

app.listen(port, () => console.log(`

██████╗ █████╗  ██████╗██╗  ██╗██╗███████╗██╗   ██╗██████╗ ███████╗███████╗████████╗
██╔════╝██╔══██╗██╔════╝██║  ██║██║██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔════╝╚══██╔══╝
██║     ███████║██║     ███████║██║█████╗   ╚████╔╝ ██████╔╝█████╗  ███████╗   ██║   
██║     ██╔══██║██║     ██╔══██║██║██╔══╝    ╚██╔╝  ██╔══██╗██╔══╝  ╚════██║   ██║ ${chalk.blue.bold('v1.0.0')}
╚██████╗██║  ██║╚██████╗██║  ██║██║██║        ██║   ██║  ██║███████╗███████║   ██║ ${chalk.blue.bold(`Made in ${chalk.white.bgRed.bold('FanapSoft')}`)}
 ╚═════╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝        ╚═╝   ╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝ 
                                                                                     
${chalk.white.bgRed.bold(`Cache server listening on port ${port} !`)}
─────────────────────────────────────
- ${chalk.blue.bold('Request Timeout')}   : ${timeout}ms / ${millisToMinutesAndSeconds(timeout)} m:s
- ${chalk.blue.bold('Cache MaxAge')}      : ${cacheMaxAge}ms / ${millisToMinutesAndSeconds(cacheMaxAge)} m:s
- ${chalk.blue.bold('Server Port')}       : ${port}
- ${chalk.blue.bold('Server Addresses')}  :
${tableServerAddresses.toString()}
─────────────────────────────────────
`));