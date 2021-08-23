import { createStore,applyMiddleware,compose } from "redux";
import {loadState, saveState} from './saveLoad'
import thunk from "redux-thunk";
import reducer from './reducers';

const initialState = loadState() || {}  ;

const store = createStore(reducer, initialState, compose(applyMiddleware(thunk),
typeof window === 'object' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
         window.__REDUX_DEVTOOLS_EXTENSION__() : f=>f
)
);
store.subscribe( function () {
    saveState(store.getState())
}) 

export default store;