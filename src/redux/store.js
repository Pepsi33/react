import { createStore,combineReducers } from 'redux';
import UserInfo from './reducers/UserInfo';

const reducer = combineReducers({
    UserInfo
});

let store = createStore(reducer)
export default store;
