// import jsonWebToken from 'jsonwebtoken';
import axios_client from '../../axios.config';

export default function createUser(data) {
  return function (dispatch) {
    return axios_client.post('/users', data)
      .then(res => dispatch({type: 'CREATE_USER', payload: data }))
      .catch(e => console.log(e.response.data.error));
  }
}

export function login(user) {
  return function (dispatch) {
    return axios_client.post('/login', user)
      .then(res => {
        console.log(res)
        localStorage.setItem("token",res.data.token);
        localStorage.setItem('user_id', res.data.user.id)
        dispatch({type: 'LOGIN', payload: user})
      }).catch(error => console.error(error))
  }
}

export function signOut() {
  return function (dispatch) {
    dispatch({type: 'SIGNOUT' })
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
  }
}
