import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const App = () => {
  const [displayValue, setDisplayValue] = useState('0');

  const handleButtonPress = (buttonValue) => {
    if (buttonValue === 'C') {
      // Clear the display
      setDisplayValue('0');
    } else if (buttonValue === '=') {
      // Evaluate the expression
      try {
        const result = eval(displayValue);
        setDisplayValue(result.toString());
      } catch (error) {
        setDisplayValue('Error');
      }
    } else {
      // Append the button value to the display
      setDisplayValue((prevValue) => prevValue === '0' ? buttonValue : prevValue + buttonValue);
    }
  };

  const renderButton = (buttonValue, buttonStyle) => (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={() => handleButtonPress(buttonValue)}
    >
      <Text style={styles.buttonText}>{buttonValue}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{displayValue}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          {renderButton('7')}
          {renderButton('8')}
          {renderButton('9')}
          {renderButton('/')}
        </View>
        <View style={styles.row}>
          {renderButton('4')}
          {renderButton('5')}
          {renderButton('6')}
          {renderButton('*')}
        </View>
        <View style={styles.row}>
          {renderButton('1')}
          {renderButton('2')}
          {renderButton('3')}
          {renderButton('-')}
        </View>
        <View style={styles.row}>
          {renderButton('0', styles.buttonDoubleWidth)}
          {renderButton('.', styles.buttonStyle)}
          {renderButton('+')}
        </View>
        <View style={styles.row}>
          {renderButton('C', styles.buttonStyle)}
          {renderButton('=')}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f1f1f1',
  },
  displayContainer: {
    backgroundColor: '#cff',
    width: '100%',
    alignItems: 'flex-end',
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
  displayText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#8a8d8a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#baf',
  },
  buttonDoubleWidth: {
    flex: 2,
  },
});

export default App;
