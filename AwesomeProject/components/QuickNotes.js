import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const QuickNotes = () => {
  const [note, setNote] = useState('');
  const [notesList, setNotesList] = useState('');

  const handleAddNote = () => {
    if (note.trim() !== '') {
      setNotesList(notesList + '\n' + note);
      setNote('');
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
