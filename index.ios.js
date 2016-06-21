/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

import React, {
  Component
} from 'react'
import {
    NavigatorIOS,
    AppRegistry,
    StyleSheet,
    StatusBar
} from 'react-native'

import {CustomListView} from './app/component/CustomListView'

class EthereumPrice extends Component {
  componentDidMount () {
    StatusBar.setBarStyle('light-content', true)
  }

  componendWillMount () {
  }

  render () {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'EthereumPrice',
          component: CustomListView
        }}
        barTintColor='#242536'
        translucent={false}
        titleTextColor={'white'}
        />
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
})

AppRegistry.registerComponent('EthereumPrice', () => EthereumPrice)
