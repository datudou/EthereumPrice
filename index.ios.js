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
    View
} from 'react-native';

import {YunBi} from './app/yunbi';
import {ACCESS_KEY,SECRET_KEY,HOST} from './app/constant';

class EthereumPrice extends Component {
    constructor(props) {
        super(props);
        this.handleData = this.handleData.bind(this);
        this.state = {
            marketsList: ""
        };
    }

    componentWillMount() {
        let yunbi = new YunBi(ACCESS_KEY, SECRET_KEY, HOST);
        yunbi.getMarkets(this.handleData);
    }

    handleData(json) {
        console.log(json[0]);
        this.setState({
            markets: json[0].id
        });
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    {this.state.markets}
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.ios.js
                </Text>
                <Text style={styles.instructions}>
                    Press Cmd+R to reload,{'\n'}
                    Cmd+D or shake for dev menu
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('EthereumPrice', () => EthereumPrice);
