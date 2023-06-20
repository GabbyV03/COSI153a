import React from 'react';
import {View,Text} from 'react-native';

import KeyPad from './components/StackDemo';

const App = () => {
    return (
        <View style={{flex:1}}>
            <Text style={{textAlign:'center',fontSize:40,marginTop:50}}>KeepUp!</Text>
            <KeyPad/>
        </View>

    )
}
export default App
