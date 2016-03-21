/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    ListView
} from 'react-native';
import {YunBi} from "./app/yunbi";

import {
    ACCESS_KEY,
    SECRET_KEY,
    HOST} from "./app/constant";

class EthereumPrice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2)=> row1 !== row2
            }),
            loaded: false
        };
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
            .done();
    }


    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading data.....
                </Text>
            </View>
        );
    }

    renderCoin(coin) {
        return (
            <View style={styles.container}>
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{coin.id}</Text>
                    <Text style={styles.name}>{coin.name}</Text>
                </View>
            </View>
        );
    }


    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderCoin}
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
    listView: {
        paddingTop: 100,
        backgroundColor: '#613030',
    },
    rightContainer: {
        flex: 1,
    },
    name: {
        textAlign: 'left',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    }
});

AppRegistry.registerComponent('EthereumPrice', () => EthereumPrice);
