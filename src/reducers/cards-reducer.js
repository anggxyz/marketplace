import * as types from '../types/cards-types'

const initialState = {
  isFetching : false,
  cards: [

    {"name":"Tayra","months":"9.8","num":"0.3.1","x":"9.17","y":"0.86","green":true,"blue":false,"manaSymbol":true,"mana":"72-559-2671"},
    {"name":"Trotter, lily","months":"5.2.3","num":"0.45","x":"0.1.3","y":"7.9","green":false,"blue":false,"manaSymbol":true,"mana":"39-917-9737"},
    {"name":"Crane, blue","months":"0.9.0","num":"6.76","x":"0.3.1","y":"2.32","green":false,"blue":true,"manaSymbol":true,"mana":"64-349-8104"},
    {"name":"White-rumped vulture","months":"4.0","num":"0.79","x":"1.72","y":"9.9.2","green":true,"blue":false,"manaSymbol":true,"mana":"01-345-8545"},
    {"name":"Common shelduck","months":"0.5.0","num":"3.1.6","x":"5.0.4","y":"8.28","green":true,"blue":true,"manaSymbol":true,"mana":"26-055-1687"},
    {"name":"Civet, common palm","months":"0.6.0","num":"0.79","x":"0.4.8","y":"0.4.9","green":false,"blue":false,"manaSymbol":true,"mana":"75-065-8283"},
    {"name":"Mudskipper (unidentified)","months":"0.30","num":"3.57","x":"2.5","y":"2.2","green":true,"blue":true,"manaSymbol":true,"mana":"88-639-3456"},
    {"name":"Mandras tree shrew","months":"6.5","num":"6.6","x":"3.9","y":"0.18","green":false,"blue":false,"manaSymbol":true,"mana":"21-298-0473"},
    {"name":"Small-toothed palm civet","months":"0.9.2","num":"2.53","x":"5.7","y":"0.51","green":true,"blue":false,"manaSymbol":true,"mana":"12-054-2437"},
    {"name":"African darter","months":"2.21","num":"1.5.7","x":"5.1.3","y":"7.17","green":true,"blue":false,"manaSymbol":false,"mana":"90-605-1700"},
    {"name":"Vervet monkey","months":"0.6.7","num":"0.36","x":"6.9.7","y":"4.9","green":true,"blue":false,"manaSymbol":true,"mana":"73-354-4204"},
    {"name":"Southern lapwing","months":"4.0","num":"4.4.5","x":"0.5.1","y":"0.9.8","green":false,"blue":true,"manaSymbol":false,"mana":"39-120-5717"}
  ]  
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
