import React, { useState } from 'react';
import Button from './Button';
import Heading from './Heading';
import Message from './Message';
import FlipCard from 'react-native-flip-card';
import { View, StyleSheet, Text } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { WIDTH, clearLocalNotifications, setLocalNotification } from '../utils/helper';

const Quiz = ({ navigation, route }) => {
  const { deck } = route.params;
  const [score, setScore] = useState(0);
  const [flip, setFlip] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const totalQuestions = deck.cards.length;
  if (totalQuestions < 1) {
    return (
      <Message
        message="Sorry, you cannot take a quiz because there are no cards in the deck."
      />
    );
  }

  const activeCard = deck.cards[activeQuestion];

  const navigate = (score) => {
    navigation.navigate('Result', {
      deck,
      totalQuestions,
      correctAnswers: score,
    });
    navigation.dispatch(state => {
      const routes = state.routes.filter(r => r.name !== 'Quiz');
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
  }

  const submit = async (type) => {
    if (type === "correct") {
      setScore(score + 1);
      if ((activeQuestion + 1) === totalQuestions) {
        await clearLocalNotifications();
        setLocalNotification();
        navigate(score + 1);
        return;
      }
    }
    if (type === "incorrect") {
      if ((activeQuestion + 1) === totalQuestions) {
        await clearLocalNotifications();
        setLocalNotification();
        navigate(score);
        return;
      }
    }
    setActiveQuestion(activeQuestion + 1);
    setFlip(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.questionNumber}>{activeQuestion + 1}/{totalQuestions}</Text>
      <View style={styles.questionWrapper}>
        <FlipCard
          flip={flip}
          friction={10}
          clickable={false}
          style={styles.card}
          flipVertical={false}
          flipHorizontal={true}
        >
          <View style={styles.horizontalCenter}>
            <Heading heading={activeCard.question} />
            <Button
              text="Answer"
              color="#d94037"
              fontWeight="bold"
              borderColor="transparent"
              backgroundColor="transparent"
              onPress={() => setFlip(!flip)}
            />
          </View>

          <View style={styles.horizontalCenter}>
            <Heading heading={activeCard.answer} />
            <Button
              text="Question"
              color="#d94037"
              fontWeight="bold"
              borderColor="transparent"
              backgroundColor="transparent"
              onPress={() => setFlip(!flip)}
            />
          </View>
        </FlipCard>
        <View>
          <Button
            text="Correct"
            borderColor="green"
            backgroundColor="green"
            onPress={() => submit('correct')}
          />
          <Button
            text="Incorrect"
            borderColor="red"
            backgroundColor="red"
            onPress={() => submit('incorrect')}
          />
        </View>
      </View>
    </View>
  );
}

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  questionNumber: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  questionWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: WIDTH * 0.03,
  },
  horizontalCenter: {
    alignItems: 'center',
  },
  card: {
    flex: 0.4,
  },
});
