'use stirct';
import CryptoJS from 'crypto-js';
import {ACCESS_KEY,SECRET_KEY,HOST} from '../Constant';


export class YunBi {
    constructor() {
        this.tonce = "";
    }

    generateSignature(payload) {
        return CryptoJS.HmacSHA256(payload, this.secretKey);
    }

    generatePayload(method, apiUri) {
        let query = this.querySen();
        return `${method}|${apiUri}|${query}`;
    }

    querySen(signature) {
        this.tonce = !signature ? new Date().getTime() : this.tonce;
        let apiWithoutSign = `access_key=${this.accessKey}&tonce=${this.tonce}`;
        let apiWithSign = `?access_key=${this.accessKey}&tonce=${this.tonce}&signature=${signature}`;
        return !signature ? apiWithoutSign : apiWithSign;
    }


    static getTickersByMarket(marketName) {
        let apiUri = `/api/v2/tickers/${marketName}.json`;
        let api = HOST + apiUri;
        return fetch(api)
            .then((res)=> {
                return res.json();
            }).then((json)=> {
                return json;
            }).catch((error)=> {
                console.warn(error);
            })
    }

    static getTickers() {
        let apiUri = '/api/v2/tickers';
        let api = HOST + apiUri;
        return fetch(api)
            .then((res)=> {
                return res.json();
            }).then((json)=> {
                return json;
            }).catch((error) => {
                console.warn(error);
            });
    }

    static getMarkets() {
        //TODO
        let apiUri = '/api/v2/markets';
        let api = HOST + apiUri;

        return fetch(api)
            .then((res)=> {
                return res.json();
            }).then((json)=> {
                return json;
            }).catch((error) => {
                console.warn(error);
            });
    }
}
