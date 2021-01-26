import { createStore } from 'redux';
import rootReducer from '../redux/ducks';

const store = createStore(rootReducer);

export default store;
