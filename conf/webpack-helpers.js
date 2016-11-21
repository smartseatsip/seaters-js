exports.replacePackageVersionLoader = {
    test: /index\.ts$/,
    loader: 'string-replace',
    query: {
        search: '${package.version}',
        replace: require('../package.json').version
    }
};

exports.replaceApiLocationLoader = function(useProxy) {
    var defaultApiPrefix = useProxy ? '/api' : 'https://api.dev-seaters.com/api';
    return {
        test: /seaters-client\.ts$/,
        loader: 'string-replace',
        query: {
            search: '${api.location}',
            replace: process.env['strs.api.location'] || defaultApiPrefix
        }
    };
}

