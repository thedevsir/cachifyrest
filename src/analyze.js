module.exports = {
    requests: {
        count: {
            allToCacheServer: 0,
            allToRealServer: 0,
        },
    },
    responses: {
        count: {
            allFromCacheServer: 0,
            allFromRealServer: 0,
            allFromCache: 0,
        },
    },
    store: {
        db: {},
        length: 0,
    }
}