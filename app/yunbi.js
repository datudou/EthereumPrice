'use stirct';
import CryptoJS from 'crypto-js';
import {ACCESS_KEY,SECRET_KEY,HOST} from '../app/constant';

export class YunBi {
    constructor(accessKey, secretKey, host) {
        this.accessKey = accessKey;
        this.secretKey = secretKey;
        this.host = host;
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


    getTickersByMarket(marketName){
        let method = "GET";
        let apiUri = `/api/v2/tickers/${marketName}.json`;
        let payload = this.generatePayload(method, apiUri);
        let signature = this.generateSignature(payload);
        let api = this.host + apiUri + this.querySen(signature)
        return fetch(api)
            .then((res)=>{
                return res.json();
            }).then((json)=>{
                return json;
            }).catch((error)=>{
                console.warn(error);
            })
    }

    getTickers() {
        //TODO:
        let method = "GET";
        let apiUri = '/api/v2/tickers';
        let payload = this.generatePayload(method, apiUri);
        let signature = this.generateSignature(payload);
        let api = this.host + apiUri + this.querySen(signature);
        return fetch(api)
            .then((res)=> {
                return res.json();
            }).then((json)=> {
                return json;
            }).catch((error) => {
                console.warn(error);
            });
    }

    getMarkets() {
        //TODO
        let method = "GET";
        let apiUri = '/api/v2/markets';
        let payload = this.generatePayload(method, apiUri);
        let signature = this.generateSignature(payload);
        console.log(signature);
        let api = this.host + apiUri + this.querySen(signature);

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
