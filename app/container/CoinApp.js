import React, {
  Component
} from 'react'
import {
    NavigatorIOS,
    AppRegistry,
    StyleSheet,
    StatusBar
} from 'react-native'

import {CustomListView} from '../component/CustomListView'
import * as actions from '../actions/fetchTickers'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class CoinApp extends Component {
  componentDidMount () {
    StatusBar.setBarStyle('light-content', true)
  }

  componendWillMount () {
  }

  render () {
    const { dispatch } = this.props
    const bindActions = bindActionCreators(actions, dispatch)
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'EthereumPrice',
          component: CustomListView,
          passProps: { ...bindActions },
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


export default connect(
  state => ({ state: state })
)(CoinApp)
