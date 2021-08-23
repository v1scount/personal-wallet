import {
  INCOME,
  OUTCOME,
  RECENTS,
  TOTAL
} from '../types/operations';

const initialState = {
  total: 0,
  recentOperations: [],
  incomes: []
}

export default function operationsReducer (state = initialState, action) {
  switch (action.type) {
    case INCOME: return {
      ...state,
      // incomes: action.payload,
      // total: state.total + action.payload
    }
    case OUTCOME : return {
      ...state,
      // total: state.total - action.payload
    }
    case RECENTS: return {
      ...state,
      recentOperations: action.payload
    }
    case TOTAL : return {
      ...state, 
      total: action.payload
    }
    default: 
      return state;
  }
}