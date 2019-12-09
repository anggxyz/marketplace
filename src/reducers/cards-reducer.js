import * as types from '../types/cards-types'
import cards from '../data/NFTList.json'

const initialState = {
  isFetching : false,
  cards
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_CARDS: {
      const newState = {...state};
      newState.cards = [...newState.cards, ...payload]
      newState.isFetching = false;
      return newState;
    }
    case types.FETCHING_CARD : {
      const newState = {...state};
      newState.isFetching = true;
      return newState;
    }
    default:
      return state
  }
}
