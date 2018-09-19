const https = require('https');
const cacheAdapter = require('axios-cache-adapter');

module.exports = (timeout, cacheMaxAge) => {

    const fetchCache = cacheAdapter.setup({
        cache: {
            maxAge: cacheMaxAge,
        },
    });

    return async function (url, method, data, headers) {

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
            // console.log(error);

        }
    }
};