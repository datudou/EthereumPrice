/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import CoinApp from './app/container/CoinApp'
import { AppRegistry } from 'react-native'
import configureStore  from './app/store/configureStore'

const store = configureStore()

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
