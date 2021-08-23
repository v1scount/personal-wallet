import { GET_CATEGORIES ,GET_INCOME_CATEGORIES, GET_OUTCOME_CATEGORIES} from '../types/categories'
import axios_client from '../../axios.config';

export function getIncomeCategories() {
  return function(dispatch) {
    return axios_client.get('/categories/incomes')
      .then(res => {
        console.log(res);
        dispatch({type: GET_INCOME_CATEGORIES, payload: res.data})
      })
    }
}

export function getOutcomeCategories() {
  return function(dispatch) {
    return axios_client.get('/categories/outcomes')
      .then(res => {
        // console.log(res);
        dispatch({type: GET_OUTCOME_CATEGORIES, payload: res.data})
      })
    }
}

export function getCategories() {
  return function(dispatch) {
    return axios_client.get('/categories')
      .then(res => {
        dispatch({type: GET_CATEGORIES, payload: res.data})
      })
  }
}