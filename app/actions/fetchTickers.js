import Rx from 'rxjs/Rx'
const apiUrl = "https://api.coinmarketcap.com/v1/ticker/?limit=10"


export function fetchTickers(){
  console.log("fetchTickers")
  return (dispatch) => {
    let requestStream = Rx.Observable.of(apiUrl)
    let responseStream = requestStream
      .flatMap( url => Rx.Observable.fromPromise(fetch(url)))
      .flatMap( r => Rx.Observable.fromPromise(r.json()))

    responseStream.subscribe(tickers => {
      console.log(tickers)
      dispatch({
        type:'GET_TICKERS',
        payload: {
          tickers
        }
      })
    })
  }
}
