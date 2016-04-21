'use strict';
import React, {
    StyleSheet,
    Text,
    View,
    Component
} from 'react-native'

export class LoadingView extends Component{
  render () {
    return (
      <View style={styles.container}>
        <Text>
            Loading data.....
        </Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

