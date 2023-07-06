import React from 'react';
import {View,Text} from 'react-native';

import StackDemo from './components/StackDemo';

const App = () => {
    return (
        <View style={{flex:1}}>
            <Text style={{textAlign:'center',fontSize:40,marginTop:50}}>Budget Buddy</Text>
            <StackDemo/>
        </View>

    )
}
export default App
