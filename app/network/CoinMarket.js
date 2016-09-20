import Rx from 'rxjs/Rx'
const apiUrl = "https://api.coinmarketcap.com/v1/ticker/?limit=10"


export function getTickers(){
  let requestStream = Rx.Observable.just(apiUrl)
  let responseStream = requestStream
    .flatMap( url => Rx.Observable.fromPromise(fetch(url)))
    .flatMap( r => Rx.Observable.fromPromise(r.json()))

  responseStream.subscribe(tickers => {
  })
}
