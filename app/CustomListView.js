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
import {CardView} from './CardView';

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
        if (this.props.navigator){
            this.props.navigator.push({
                title:rowData.name,
                component: CardView,
                passProps: {rowData}
            });
            console.log(rowData);
        }
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
                style={styles.row}
                underlayColor='#c8c7cc'
                onPress={()=>{this.onPressButton(coin)}}>
                <View style={styles.rightContainer}>
                    <Text style={styles.name}>{coin.name}</Text>
                </View>
            </TouchableHighlight>
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
                renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
                style={styles.listView}>
            </ListView>
        );
    }

}


const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 30,
        backgroundColor: '#F6F6F6',
    },
    container: {
        flex: 1,
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
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    listView: {
        paddingTop: 60,
        backgroundColor: '#F5FCFF',
    },
});
