import {combineReducers, createStore} from 'redux';
import authReducer from "./auth-reducer";
import cardsReducer from './cards_reducer';


let reducers = combineReducers({
    auth: authReducer,
    table: cardsReducer,
})

let store = createStore(reducers);


window.state = store.getState();

export default  store


