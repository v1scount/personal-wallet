import { combineReducers } from "redux";
import userReducer from './user-reducer';
import categoriesReducer from './categories-reducer'
import operationsReducer from "./operations-reducer";

const reducer = combineReducers({
  users: userReducer,
  categories: categoriesReducer,
  operations: operationsReducer
})

export default reducer;