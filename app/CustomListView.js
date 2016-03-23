/**
 * Created by qianyiwang on 3/17/16.
 */
'use strict';
import React, {
    Image,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight,
    Component
} from 'react-native';

import {
    ACCESS_KEY,
    SECRET_KEY,
    HOST} from "./constant";

import {YunBi} from './yunbi';

export class CustomListView extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2)=> row1 !== row2
            }),
            loaded:false
        }
    }

    onPressButton(rowData){
        console.log(rowData);
    }

    componentDidMount() {
        let yunbi = new YunBi(ACCESS_KEY, SECRET_KEY, HOST);
        yunbi.getMarkets()
            .then((response)=> {
                console.log(response);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(response),
                    loaded: true
                });
            })
    }

    renderLoadingView(){
        return (
            <View style={styles.container}>
                <Text>
                    Loading data.....
                </Text>
            </View>
        )
    }

    renderCoin(coin) {
        return (
            <TouchableHighlight
                style={styles.container}
                underlayColor='#c8c7cc'
                onPress={()=>{this.onPressButton(coin)}}>
                <View style={styles.rightContainer}>
                    <Text style={styles.name}>{coin.name}</Text>
                </View>
            </TouchableHighlight>
            // <View style={styles.container}>
            //     <View style={styles.rightContainer}>
            //         <Text style={styles.title}>{coin.id}</Text>
            //         <Text style={styles.name}>{coin.name}</Text>
            //     </View>
            // </View>
        )
    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderCoin.bind(this)}
                style={styles.listView}>
            </ListView>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    rightContainer: {
        flex: 1,
    },
    name: {
        textAlign: 'left',
    },
    listView: {
        paddingTop: 100,
        backgroundColor: '#613030',
    },
});
