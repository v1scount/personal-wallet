
const initialState = {
  user: [],
  isAuthenticated: false,
  token: ''
}

export default function userReducer( state = initialState, action ) {
  switch (action.type) {
    case 'CREATE_USER': return {
        ...state,
        // user: action.payload
      }
      case 'LOGIN': return {
        ...state,
        // user: action.payload,
        isAuthenticated: true
      }
      case 'SIGNOUT': return {
        ...state,
        isAuthenticated: false,
        user: []
      }
    default:
      return state;
  }
}