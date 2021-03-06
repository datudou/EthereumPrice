export default function tickers(state = {} , action ){
  switch (action.type) {
    case 'GET_TICKERS':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      }
    default:
      return state
  }
}
