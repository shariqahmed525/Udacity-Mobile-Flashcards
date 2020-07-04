import React, { useState } from 'react';
import Input from './Input';
import store from '../store';
import Button from './Button';
import Heading from './Heading';
import { addDeck } from '../actions';
import * as DecksApi from '../utils/DecksApi';
import { View, StyleSheet } from 'react-native';
import { HEIGHT, WIDTH, randomId } from '../utils/helper';

const AddDeck = ({ navigation }) => {
  const [title, setTitle] = useState("");

  const create = async () => {
    const trimTitle = title.trim();
    if (!trimTitle) {
      alert("Please enter deck title");
      return;
    }
    const id = randomId();
    const timeStamp = Date.now();
    const obj = {
      [id]: {
        id,
        timeStamp,
        cards: [],
        title: trimTitle,
      }
    }
    await DecksApi.createDeck(obj);
    store.dispatch(addDeck(obj));
    setTitle("");
    navigation.navigate('Deck', {
      title, trimTitle,
      deckId: id
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.fullWidth}>
        <Heading heading="What is the title of your new deck?" />
        <Input
          value={title}
          onSubmitEditing={create}
          placeholder="Deck Title"
          onChangeText={text => setTitle(text)}
        />
      </View>
      <Button
        onPress={create}
        text="Create Deck"
        borderColor="#000"
        backgroundColor="#000"
      />
    </View>
  );
}

export default AddDeck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#fff",
    justifyContent: 'space-between',
    paddingVertical: HEIGHT * 0.06,
    paddingHorizontal: WIDTH * 0.06,
  },
  fullWidth: {
    width: '100%'
  },
});
