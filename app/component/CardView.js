/**
 * Created by qianyiwang on 3/18/16.
 */
import React, {
  PropTypes,
  Component
} from 'react'
import {
  StyleSheet,
  Text,
  Dimensions,
  View
} from 'react-native'

import {
  YunBi
} from '../network/YunBi'

import {
  LoadingView
} from './LoadingView.js'

class CardView extends Component {
  static propTypes = {
    rowData: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props)
    this.state = {
      ticker: {
        buy: '',
        sell: '',
        low: '',
        high: '',
        last: '',
        vol: ''
      },
      time: '',
      isLoaded: false
    }
  }

  componentDidMount () {
    console.log(this.state)
    this.coinName = this.props.rowData.name
    this.startTimer()
  }

  componentWillUnmount () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  fetchData () {
    let marketId = this.props.rowData.id
    new YunBi().getTickersByMarket(marketId)
      .then((response) => {
        this.setState({
          ticker: response.ticker,
          isLoaded: true
        })
      })
  }

  startTimer () {
    this.timer = setInterval(this.fetchData.bind(this), 1000)
  }

  render () {
    //TODO:if no network show error promoptText  

//    if(noNetWork) {
//      return (<NoNetWorkDiaglog/>)
//    }

    if (!this.state.isLoaded) {
      return (<LoadingView/>)
    }

    return (
      <View style={styles.container}>
        <View style={styles.containerLP}>
          <Text style={styles.promoptText}>
            Last price
          </Text>
          <Text style={styles.lastPrice}>
            {this.state.ticker.last}
          </Text>
        </View>
        <View style={styles.highAndLow}>
          <View style={styles.high}>
            <Text style={styles.promoptText}>
              High
            </Text>
            <Text style={styles.hightPrice}>
              {this.state.ticker.high}
            </Text>
          </View>
          <View style={styles.low}>
            <Text style={styles.promoptText}>
              Low
            </Text>
            <Text style={styles.lowPrice}>
              {this.state.ticker.low}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#242536',
    justifyContent: 'flex-start'
  },
  high:{
    flexDirection:'column',
    alignItems: 'center',
    marginRight: 59
  },
  low:{
    flexDirection:'column',
    alignItems: 'center'
  },
  coinName: {
    fontSize: 20,
    color: 'white'
  },
  containerLP: {
    marginTop: 64,
    alignItems: 'center',
    flexDirection: 'column'
  },
  highAndLow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 45
  },
  promoptText: {
    fontSize: 14,
    color: '#6A7088'
  },
  lastPrice: {
    fontSize: 50,
    color: '#FB497C'
  },
  hightPrice: {
    fontSize: 32,
    color: 'white'
  },
  lowPrice:{
    fontSize: 32,
    color: 'white'
  }
})

export default CardView
