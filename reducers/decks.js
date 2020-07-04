import { GET_DECKS, ADD_DECK, DELETE_DECK, ADD_CARD } from "../types";

const initialState = {
  decks: {},
}

const decks = (state = initialState, action) => {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        decks: {
          ...state.decks,
          ...action.decks
        }
      };
    case ADD_DECK:
      return {
        ...state,
        decks: {
          ...state.decks,
          ...action.deck,
        }
      };
    case DELETE_DECK:
      const deckId = action.deckId;
      const decks = state.decks;
      if (decks[deckId]) {
        delete decks[deckId];
      }
      return {
        ...state,
        decks: {
          ...decks,
        }
      }
    case ADD_CARD:
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.deckId]: {
            ...state.decks[action.deckId],
            cards: state.decks[action.deckId].cards.concat([action.card])
          }
        }
      };
    default:
      return state;
  }
}

export default decks;