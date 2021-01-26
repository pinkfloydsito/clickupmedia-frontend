import { combineReducers } from "redux";
import categoryReducer from './category/model'
import storeReducer from './store/model'
import productReducer from './product/model'


const reducer = combineReducers({
  store: storeReducer,
  category: categoryReducer,
  product: productReducer,
});

export default reducer;
