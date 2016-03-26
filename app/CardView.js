/**
 * Created by qianyiwang on 3/18/16.
 */


import React,{
    View,
    StyleSheet,
    Text,
    Image,
    Component
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {YunBi} from './yunbi';

import {ACCESS_KEY,
        SECRET_KEY,
        HOST} from './constant';


export class CardView extends Component {

    constructor(props){
        super(props);
        this.state = {
            ticker:{
                buy:"",
                sell:"",
                low:"",
                high:"",
                last:"",
                vol:""
            },
            time:""
        }
    }

    componentDidMount(){
        this.coinName = this.props.rowData.name,
        this.startTimer();
    }

    componentWillUnmount(){
        if(this.timer){
            clearInterval(this.timer);
        }
    }

    fetchData(){
        let marketId = this.props.rowData.id;
        let yunbi = new YunBi(ACCESS_KEY, SECRET_KEY, HOST);
        yunbi.getTickersByMarket(marketId)
            .then((response)=> {
                this.setState({
                    ticker:response.ticker
                })
            });
    }

    startTimer(){
        this.timer = setInterval(this.fetchData.bind(this),1000);
    }

    render(){
        return (
            <LinearGradient style={styles.container}
                colors={['#BDCAFA', '#DDD9FA', '#F5EDFA']}>
                <Text style={styles.coinName}>
                    {this.coinName}
                </Text>
                <Text>
                    {this.state.ticker.last}
                    {this.state.ticker.low}
                    {this.state.ticker.high}
                </Text>
            </LinearGradient>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
    },
    coinName: {
        fontSize: 20
    },
});
