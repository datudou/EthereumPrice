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
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false,
      isMenuOpened: false,
      selectItem: 'About'
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
    new YunBi().getMarkets()
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
        style={styles.row}
        underlayColor='#c8c7cc'
        onPress={() => { this.onPressButton(coin) }}>
        <View style={styles.rightContainer}>
          <Text style={styles.name}>{coin.name}</Text>
        </View>
      </TouchableHighlight>
    )
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
    padding: 30,
    backgroundColor: '#F6F6F6'
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
    textAlign: 'left'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC'
  },
  listView: {
    paddingTop: 60,
    backgroundColor: '#F5FCFF'
  },
  customWrapperStyle: {
    backgroundColor: '#242536'
  }

})
