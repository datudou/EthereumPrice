import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'

export default function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(thunk),
    global.reduxNativeDevTools ?
      global.reduxNativeDevTools(/*options*/) :
      noop => noop
  )
  // Note: passing enhancer as last argument requires redux@>=3.1.0
  const store = createStore(reducer, initialState, enhancer)
  // If you have other enhancers & middlewares
  // update the store after creating / changing to allow devTools to use them
  if (global.reduxNativeDevTools) {
    global.reduxNativeDevTools.updateStore(store)
  }
  return store
}
