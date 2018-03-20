import { createStore } from 'redux';
import reducers from './reducers/index'

let store = createStore(reducers);

export default store;


export let unsubscribe = store.subscribe(() =>
    console.log(store.getState())
)