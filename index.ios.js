/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

import React, { Component } from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import * as reducers from './app/reducers'
import CoinApp from './app/container/CoinApp'
import { AppRegistry } from 'react-native'



const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const reducer = combineReducers(reducers)
const store = createStoreWithMiddleware(reducer)


export default class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <CoinApp />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('EthereumPrice', () => App)
