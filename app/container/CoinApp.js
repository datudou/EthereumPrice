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
import { fetchTickers } from '../actions/fetchTickers'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class CoinApp extends Component {
  componentDidMount () {
    StatusBar.setBarStyle('light-content', true)
  }

  componendWillMount () {
  }

  render () {
    const { actions } = this.props
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'EthereumPrice',
          component: CustomListView,
          passProps: { actions },
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

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(fetchTickers, dispatch),
  }
}

export default connect(mapDispatchToProps)(CoinApp)
