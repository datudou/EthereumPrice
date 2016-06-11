'use stirct'
import CryptoJS from 'crypto-js'
import {
  HOST
} from '../constant'

export class YunBi {

  constructor (secertKey, accessKey) {
    this.tonce = ''
    if (!secertKey && !accessKey) {
      this.secertKey = secertKey
      this.accessKey = accessKey
    }
  }

  generateSignature (payload) {
    return CryptoJS.HmacSHA256(payload, this.secretKey)
  }

  generatePayload (method, apiUri) {
    let query = this.querySen()
    return `${method}|${apiUri}|${query}`
  }

  querySen (signature) {
    this.tonce = !signature ? new Date()
      .getTime() : this.tonce
    let apiWithoutSign = `access_key=${this.accessKey}&tonce=${this.tonce}`
    let apiWithSign =
      `?access_key=${this.accessKey}&tonce=${this.tonce}&signature=${signature}`
    return !signature ? apiWithoutSign : apiWithSign
  }

  publicApiFetch (api, params) {
    const apiUrl = `${HOST}/api/v2/${api}`
    return fetch(apiUrl)
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        return json
      })
      .catch((error) => {
        throw error
      })
  }

  privateApiFetch (api, params, method) {
    if (!this.secertKey || !this.accessKey) {
      throw new Error('Access key and secret key is required')
    }
    const payload = this.generatePayload(method, `/api/v2/${api}`)
    const signature = this.generateSignature(payload)
    const apiUrl = `${HOST}/api/v2/${api}${this.querySen(signature)}`
    return fetch(apiUrl)
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        return json
      })
      .catch((error) => {
        throw error
      })
  }

  getMemberInfo () {}

  buy () {}

  sell () {}

  getTickersByMarket (marketName) {
    return this.publicApiFetch(`/tickers/${marketName}.json`)
  }

  getTickers () {
    return this.publicApiFetch('/tickers')
  }

  getMarkets () {
    return this.publicApiFetch('/markets')
  }
}
