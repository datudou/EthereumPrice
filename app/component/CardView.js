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

//import LinearGradient from 'react-native-linear-gradient'
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
    if (!this.state.isLoaded) {
      return (<LoadingView/>)
    }

    return (
      <View>
        <Text style={styles.coinName}>
          {this.coinName}
        </Text>
        <Text>
          {this.state.ticker.last}
        </Text>
        <Text>
          {this.state.ticker.high}
        </Text>
        <Text>
          {this.state.ticker.low}
        </Text>
        <Text>
          {Dimensions.get('window').width}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },
  coinName: {
    fontSize: 20
  }
})

export default CardView
