import {INCOME, RECENTS, TOTAL, OUTCOME} from '../types/operations';
import axios_client from '../../axios.config';

export function createIncome(data) {
  return function(dispatch) {
    console.log(data);
    axios_client.post('/operations/income', data) 
      .then(res => {
        // console.log(res)
        dispatch({ type: INCOME })
      })
      .catch(e => console.log(e.response))
  }
}

export function createOutcome(data) {
  return function(dispatch) {
    axios_client.post('/operations/outcome', data)
      .then( res => {
        dispatch({type: OUTCOME });
        // dispatch({type: TOTAL, payload: res.data})
      })
      .catch(e => console.log(e.response))
  }
}

export function getRecentOperations(data) {
  return function(dispatch) {
    // console.log(data);
    axios_client.get(`/operations/userOperations=${data}`)
      .then((res) => {
        // console.log(res)
        dispatch({type: RECENTS, payload: res.data})
      })
  }
}

export function getTotal(data) {
  return function(dispatch) {
    axios_client.get(`/operations/total=${data}`)
      .then(res => {
        console.log(res)
        dispatch({type: TOTAL, payload: res.data})
      })
  }
}