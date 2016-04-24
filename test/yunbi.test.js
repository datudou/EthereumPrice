"use strict"
import {YunBi} from '../app/network/YunBi.js'
import {
    ACCESS_KEY,
    SECRET_KEY,
    HOST} from '../app/constant'


let yunbi = new YunBi(ACCESS_KEY, SECRET_KEY, HOST)


yunbi.getMarkets()
  .then((res) => {
    console.log(res)
  })

yunbi.getTickers()
  .then((res) => {
    console.log(res)
  })
//yunbi.getTickersByMarket()

