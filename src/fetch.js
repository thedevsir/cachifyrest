const https = require('https');
const axios = require('axios');
const cacheAdapter = require('axios-cache-adapter');
const analyze = require('./analyze');

module.exports = (timeout, cacheMaxAge) => {

    const cache = cacheAdapter.setupCache({
        maxAge: cacheMaxAge,
        // exclude: {
        //     query: false
        // },
    });

    const fetchCache = axios.create({
        adapter: cache.adapter
    });

    return async function (url, method = 'GET', data = {}, headers = {}) {

        cache.store.getItem(url).then(item => {
            if (item !== null) {
                analyze.responses.count.allFromCache++;
            } else {
                analyze.responses.count.allFromRealServer++;
                analyze.requests.count.allToRealServer++;
            }
        });

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

            // Interacting with the store, see `localForage` API.
            cache.store.length().then(length => {
                analyze.store.length = length;
            });

            return response.data;

        } catch (error) {

            // console.log("ERR: ", error);
        }
    }
};