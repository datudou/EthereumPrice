/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {
    NavigatorIOS,
    AppRegistry,
    Component,
    StyleSheet,
    View,
} from 'react-native';

import {CustomListView} from './app/component/CustomListView';

class EthereumPrice extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }


    render(){
        return(
                <NavigatorIOS
                    style={styles.container}
                    initialRoute={{
                        title:"EthereumPrice",
                        component: CustomListView
                    }}>
                </NavigatorIOS>
            );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },

    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    }
});

AppRegistry.registerComponent('EthereumPrice', () => EthereumPrice);
