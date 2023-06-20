import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuickNotes = () => {
  const [note, setNote] = useState('');
  const [notesList, setNotesList] = useState('');

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes !== null) {
        setNotesList(storedNotes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveNotes = async (notes) => {
    try {
      await AsyncStorage.setItem('notes', notes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddNote = () => {
    if (note.trim() !== '') {
      const updatedNotes = notesList + '\n' + note;
      setNotesList(updatedNotes);
      setNote('');
      saveNotes(updatedNotes);
    }
  };

  const handleClearNotes = async () => {
    setNotesList('');
    setNote('');
    try {
      await AsyncStorage.removeItem('notes');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Notes</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your note"
        value={note}
        onChangeText={(text) => setNote(text)}
      />
      <Button title="Add" onPress={handleAddNote} />
      <Button title="Clear" onPress={handleClearNotes} />
      <Text style={styles.notes}>{notesList}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  notes: {
    fontSize: 16,
    marginTop: 16,
  },
});

export default QuickNotes;
