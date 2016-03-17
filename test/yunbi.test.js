"use strict";
import {YunBi} from '../app/yunbi.js';
import {
    ACCESS_KEY,
    SECRET_KEY,
    HOST} from '../app/constant';


let yunbi = new YunBi(ACCESS_KEY, SECRET_KEY, HOST);


yunbi.getMarkets();

//let genSig = CryptoJS.SHA256.decrypt()

