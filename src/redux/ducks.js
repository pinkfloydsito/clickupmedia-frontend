import { all } from "redux-saga/effects";
import { combineReducers } from "redux";
import categoryReducer, { saga as categorySaga } from './category/model'
import storeReducer, { saga as storeSaga } from './store/model'
import productReducer, { saga as productSaga } from './product/model'


const reducer = combineReducers({
  store: storeReducer,
  category: categoryReducer,
  product: productReducer,
});

export function* rootSaga() {
  yield all([
    storeSaga(),
    productSaga(),
    categorySaga(),
  ]);
}

export default reducer;
