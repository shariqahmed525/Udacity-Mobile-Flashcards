import { AsyncStorage } from "react-native";

const STORAGE_KEY = "Flashcard:Storage";

export const getDecks = async () => {
  const decksData = await AsyncStorage.getItem(STORAGE_KEY);
  return JSON.parse(decksData);
}

export const createDeck = async deck => {
  await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(deck));
}

export const deleteDeck = async deckId => {
  const decks = await AsyncStorage.getItem(STORAGE_KEY);
  const parseDecks = JSON.parse(decks);
  delete parseDecks[deckId];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(parseDecks));
}

export const addCard = async (deckId, card) => {
  const decks = await AsyncStorage.getItem(STORAGE_KEY);
  const parseDecks = JSON.parse(decks);
  parseDecks[deckId] = {
    ...parseDecks[deckId],
    cards: parseDecks[deckId].cards.concat([card])
  };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(parseDecks));
}
