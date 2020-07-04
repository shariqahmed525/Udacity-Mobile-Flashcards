import React, { useEffect, useState } from 'react';
import store from '../store';
import Button from './Button';
import Heading from './Heading';
import { connect } from 'react-redux';
import { deleteDeck } from '../actions';
import * as DeckApi from '../utils/DecksApi';
import { View, StyleSheet } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

const Deck = ({ route, rDeck, navigation }) => {
  const { title } = route.params;
  navigation.setOptions({ title });

  const [deck, setDeck] = useState(null);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    rDeck && setDeck(rDeck);
  }, [rDeck])

  const removeDeck = async () => {
    setAlert(false);
    await DeckApi.deleteDeck(deck.id);
    store.dispatch(deleteDeck(deck.id));
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <AwesomeAlert
        show={alert}
        showProgress={false}
        title="Delete Deck"
        cancelText="No, cancel"
        showCancelButton={true}
        showConfirmButton={true}
        closeOnTouchOutside={false}
        confirmText="Yes, delete it"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={removeDeck}
        closeOnHardwareBackPress={false}
        message="Are you sure to do this?"
        onCancelPressed={() => setAlert(false)}
      />
      {deck && (
        <>
          <Heading
            heading={deck.title}
            subHeading={`${deck.cards.length} ${deck.cards.length > 1 ? "cards" : "card"}`}
          />
          <View>
            <Button
              color="#000"
              text="Add Card"
              borderColor="#000"
              backgroundColor="transparent"
              onPress={() => navigation.navigate('AddCard', {
                deckId: deck.id
              })}
            />
            <Button
              text="Start Quiz"
              borderColor="#000"
              backgroundColor="#000"
              onPress={() => navigation.navigate('Quiz', {
                deck
              })}
            />
            <Button
              color="red"
              text="Delete Deck"
              borderColor="transparent"
              backgroundColor="transparent"
              onPress={() => setAlert(true)}
            />
          </View>
        </>
      )}
    </View>
  );
}

const mapStateToProp = ({ reducer }, { route }) => {
  const deckId = route.params.deckId;
  const decks = reducer.decks;
  const deck = decks[deckId];
  return {
    rDeck: deck
  };
}

export default connect(mapStateToProp)(Deck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#fff",
    justifyContent: 'space-around',
  }
});
