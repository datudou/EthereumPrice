/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

import React, {
    NavigatorIOS,
    AppRegistry,
    Component,
    StyleSheet
} from 'react-native'

import {CustomListView} from './app/component/CustomListView'

class EthereumPrice extends Component {
  componentDidMount () {

  }

  render () {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'EthereumPrice',
          component: CustomListView
        }}/>
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
