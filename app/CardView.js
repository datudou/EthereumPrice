/**
 * Created by qianyiwang on 3/18/16.
 */


import React,{
    View,
    StyleSheet,
    Text,
    Component
} from 'react-native';

import {YunBi} from './yunbi';
import {ACCESS_KEY,
        SECRET_KEY,
        HOST} from './constant';

export class CardView extends Component {
    constructor(props){
        super(props);
        this.state = {
            coinName:"",
            coinPrice: "",

        }
    }


    componentDidMount(){
        let marketId = this.props.rowData.id;
        let yunbi = new YunBi(ACCESS_KEY, SECRET_KEY, HOST);
        yunbi.getTickersByMarket(marketId)
            .then((response)=> {
                this.setState({
                    coinName:this.props.rowData.name,
                    coinPrice:response.ticker.last,
                })
            });
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>
                    {this.state.coinName}
                    {this.state.coinPrice}
                </Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
    }
});
