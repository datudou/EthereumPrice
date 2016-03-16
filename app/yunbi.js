'use stirct';
import fetch from 'node-fetch';
import crypto from 'crypto';
const ACCESS_KEY = "OxkUCE2MPXBIDY2LlUOH8IzcYBxyiy1DZc53kJan";
const SECRET_KEY = "7sKHlCddau4kLtLO0qfV8d14ZF5C0PxqXIzARqcC";
const HOST = "https://yunbi.com";


class YunBi {
    constructor(accessKey, secretKey, host) {
        this.accessKey = accessKey;
        this.secretKey = secretKey;
        this.host = host;
    }


    generateSignature(payload) {
        return crypto.createHmac('SHA256', this.secretKey).update(payload).digest('hex')
    }

    generatePayload(method, apiUri) {
        let query = this.querySen();
        return `${method}|${apiUri}|${query}`;
    }

    querySen(signature) {
        let tonce = new Date().getTime();
        let apiWithoutSign = `access_key=${this.accessKey}&tonce=${tonce}`;
        let apiWithSign = `?access_key=${this.accessKey}&tonce=${tonce}&signature=${signature}`;
        return !signature ? apiWithoutSign : apiWithSign;
    }


    getMarkets() {
        //TODO:
        let method = "GET";
        let apiUri = '/api/v2/markets';
        let payload = this.generatePayload(method, apiUri);
        let signature = this.generateSignature(payload);
        let api = this.host + apiUri + this.querySen(signature);

        fetch(api)
            .then((res)=> {
                return res.json();
            }).then((json)=> {
                console.info(json);
            }
        );
    }


}


let yunbi = new YunBi(ACCESS_KEY, SECRET_KEY, HOST);
yunbi.getMarkets();






