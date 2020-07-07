import React, { useState } from 'react';
import Input from './Input';
import store from '../store';
import Button from './Button';
import { addCard } from '../actions';
import * as DeckApi from '../utils/DecksApi';
import { View, StyleSheet } from 'react-native';

const AddCard = ({ route, navigation }) => {
  const { deckId } = route.params;
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");

  const submit = async () => {
    const trimAnswer = answer.trim();
    const trimQuestion = question.trim();
    if (!trimQuestion) {
      alert("Please enter question");
      return;
    }
    if (!trimAnswer) {
      alert("Please enter answer");
      return;
    }
    const obj = {
      question: trimQuestion,
      answer: trimAnswer,
    };
    await DeckApi.addCard(deckId, obj);
    store.dispatch(addCard(deckId, obj));
    navigation.goBack();
    setAnswer("");
    setQuestion("");
  }

  return (
    <View style={styles.container}>
      <View>
        <Input
          value={question}
          placeholder="Question"
          onChangeText={text => setQuestion(text)}
        />
        <Input
          value={answer}
          placeholder="Answer"
          onChangeText={text => setAnswer(text)}
        />
      </View>
      <Button
        text="Submit"
        onPress={submit}
        borderColor="#000"
        backgroundColor="#000"
      />
    </View>
  );
}

export default AddCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#fff",
    justifyContent: 'space-around',
  },
});
