import {
  GET_CATEGORIES,
  GET_INCOME_CATEGORIES,
  GET_OUTCOME_CATEGORIES
} from '../types/categories'

const initialState = {
  categories: [],
  incomeCategories: [],
  outcomeCategories: []
}

export default function categoriesReducer (state = initialState, action) {
  switch(action.type) {
    case GET_CATEGORIES: return {
      ...state,
      categories: action.payload
    }
    case GET_INCOME_CATEGORIES: return {
      ...state,
      incomeCategories: action.payload
    }
    case GET_OUTCOME_CATEGORIES: return {
      ...state,
      outcomeCategories: action.payload
    }
    default: 
      return state;
    
  }
}