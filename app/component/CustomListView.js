/**
 * Created by qianyiwang on 3/17/16.
 */
'use strict'
import React, {
  Component,
  PropTypes
} from 'react'

import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native'

import {
  YunBi
} from '../network/YunBi'

import CardView from './CardView'

import {
  LoadingView
} from './LoadingView'

export class CustomListView extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props)
    console.log("#####", props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false,
      isMenuOpened: false,
      selectItem: 'About',
      ticker: ''
    }
    this.renderCoin = this.renderCoin.bind(this)
  }

  onPressButton (rowData) {
    if (this.props.navigator) {
      this.props.navigator.push({
        title: rowData.name,
        component: CardView,
        leftButtonTitle: '',
        tintColor:'white',
        leftButtonIcon: require('../img/NavBack.png'),
        onLeftButtonPress: () => this.props.navigator.pop(),
        passProps: {
          rowData
        }
      })
    }
  }

  onMenuItemSelected (item) {
    this.setState({
      isOpen: false,
      selectemItem: item
    })
  }

  componentDidMount () {
    this.props.actions()
    let yunbi = new YunBi()
    yunbi.getMarkets()
      .then((response) => {
        console.info(response)
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(response),
          loaded: true
        })
      })
  }

  renderLoadingView () {
    return (
      <View style={styles.container}>
        <Text>
           Loading data.....
        </Text>
      </View>
    )
  }

  renderCoin (coin) {
    return (
      <TouchableHighlight
        style={this._jeweStyle(coin.name)}
        underlayColor='#c8c7cc'
        onPress={() => { this.onPressButton(coin) }}>
        <View style={styles.rightContainer}>
          <Text style={styles.name}>{coin.name}</Text>
          <Text></Text>
        </View>
      </TouchableHighlight>
    )
  }

  fetchPrice (marketId) {
    new YunBi().getTickersByMarket(marketId)
      .then((response) => {
        this.setState({
          ticker: response.ticker
        })
      })
  }

  _jeweStyle (coinName) {
    return {
      flexDirection: 'row',
      justifyContent: 'center',
      height: 162,
      backgroundColor: this._randomColor(coinName)
    }
  }

  _randomColor (coinName) {
    console.log(coinName)
    let colors = { 'BTC/CNY': '#43C9D6', 'ETH/CNY': '#46BE8A', 'DGD/CNY': '#4D7BF3',
                    'DGD/BTC': '#926DDE', 'ETH/BTC': '#43C9D6', 'BTS/CNY': '#46BE8A',
                    'BITCNY/CNY': '#4D7BF3', 'DCS/CNY': '#926DDE', 'SC/CNY': '#43C9D6',
                    'DAO/CNY': '#46BE8A', 'DAO/BTC': '#4D7BF3'}
    if (colors[coinName] === undefined) {
      return '#43C9D6'
    } else {
      return colors[coinName]
    }
  }

  updateMenuState (isOpen) {
    this.setState({
      isMenuOpened: isOpen
    })
  }

  render () {
    if (!this.state.loaded) {
      return (<LoadingView/>)
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderCoin}
        renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
        style={styles.listView}
       />
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 162,
    backgroundColor: '#43C9D6'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  rightContainer: {
    flex: 1
  },
  name: {
    textAlign: 'left',
    color:'white',
    marginTop: 35,
    marginLeft: 28,
    fontSize: 17
  },
  separator: {
    height: 1,
    backgroundColor: '#242536'
  },
  listView: {
    paddingTop: 60,
    backgroundColor: '#F5FCFF'
  },
  customWrapperStyle: {
    backgroundColor: '#242536'
  }
})
