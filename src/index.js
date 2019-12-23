const Strategy = require('passport-strategy');
const request = require('request');


class AppleTokenStrategy extends Strategy {

    constructor(options, verify) {
        super();

        // check validity of arguments
        if (!(typeof options === 'object' || typeof verify === 'function'))
            throw new Error('AppleTokenStrategy requires 2 arguments and they should be object and cb function.');

        if (!options.clientID || !options.clientSecret) {
            throw new Error('You must provide clientID and clientSecret');
        }

        this.name = 'apple-token';
        this._verify = verify;
        this._passReqToCallback = options.passReqToCallback;
        this._clientID = options.clientID;
        this._jwtOptions = options.jwtOptions || {};
    }

    _getBearerToken(headers) {
        if (headers && headers.authorization) {
            const parts = headers.authorization.split(' ');
            return (parts.length === 2 && parts[0] === 'Bearer') ? parts[1] : undefined;
        }
    }

    authenticate(req, options = {}) {

        const idToken = (req.body && (req.body.id_token || req.body.access_token))
            || (req.query && (req.query.id_token || req.query.access_token))
            || (req.headers && (req.headers.id_token || req.headers.access_token))
            || (this._getBearerToken(req.headers));

        if (!idToken) return this.fail({ message: 'No ID token provided' });



    }

}

module.exports = AppleTokenStrategy;