import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Card from './Card';
import Message from './Message';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet } from 'react-native';

const Decks = ({ rDecks, navigation }) => {
  const [decks, setDecks] = useState({});

  useEffect(() => {
    rDecks && setDecks(rDecks);
  }, [rDecks])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {decks && (
        (!_.isEmpty(decks) && Object.keys(decks).length > 0) ? (
          Object.keys(decks)
            .sort((a, b) => decks[b].timeStamp - decks[a].timeStamp)
            .map(deckId => {
              const title = decks[deckId].title;
              const cards = decks[deckId].cards.length;
              return (
                <Card
                  key={deckId}
                  heading={title}
                  subHeading={`${cards} ${cards > 1 ? "cards" : "card"}`}
                  onPress={() => navigation.navigate('Deck', { title, deckId })}
                />
              )
            })
        ) : (
            <Message
              message="Sorry, you don't have any deck."
            />
          )
      )}
    </ScrollView>
  );
}

const mapStateToProp = ({ reducer }) => {
  return {
    rDecks: reducer.decks
  };
}

export default connect(mapStateToProp)(Decks);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: "#fff",
  }
});
