import { GET_DECKS, ADD_DECK, DELETE_DECK, ADD_CARD } from "../types";

export const getDecks = decks => {
  return {
    type: GET_DECKS,
    decks
  };
}

export const addDeck = (obj) => {
  return {
    type: ADD_DECK,
    deck: obj
  };
}

export const deleteDeck = deckId => {
  return {
    type: DELETE_DECK,
    deckId
  };
}

export const addCard = (deckId, card) => {
  return {
    type: ADD_CARD,
    deckId,
    card,
  };
}