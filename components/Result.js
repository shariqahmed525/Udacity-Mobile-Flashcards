import React from 'react';
import Button from './Button';
import Heading from './Heading';
import { WIDTH, isFloat } from '../utils/helper';
import { View, StyleSheet, Text } from 'react-native';
import { CommonActions } from '@react-navigation/native';

const Result = ({ route, navigation }) => {
  const { correctAnswers, totalQuestions, deck } = route.params;

  const navigate = () => {
    navigation.navigate('Quiz', {
      deck
    });
    navigation.dispatch(state => {
      const routes = state.routes.filter(r => r.name !== 'Result');
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
  }

  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const fixed = isFloat(percentage) ? percentage.toFixed(2) : percentage;

  return (
    <View style={styles.container}>
      <Heading heading="Quiz Completed" />
      <Text style={[styles.resultText, { marginTop: 20 }]}>
        You gave <Text style={styles.bold}>{fixed}%</Text> correct answers
      </Text>
      <Text style={[styles.resultText, { marginBottom: 20 }]}>
        <Text style={styles.bold}>{correctAnswers} </Text>
        {correctAnswers > 1 ? "answers" : "answer"} correct out of
        <Text style={styles.bold}> {totalQuestions} </Text>
        {totalQuestions > 1 ? "questions" : "question"}
      </Text>
      <View style={styles.buttonsWrapper}>
        <Button
          width={"45%"}
          borderColor="#a1a1a1"
          onPress={navigate}
          text="RESTART QUIZ"
          backgroundColor="#a1a1a1"
        />
        <Button
          width={"45%"}
          text="GO TO DECK"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
}

export default Result;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: WIDTH * 0.03,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonsWrapper: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  bold: {
    fontWeight: 'bold',
  }
});
