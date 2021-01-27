import { createSlice, createAction } from '@reduxjs/toolkit'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {
  ProductsAPI, CategoriesAPI
} from '../../api/rest-api';

const initialState = {
  data: [],

  /*Fields */
  fields: {
    id: null,
    name: null,
    price: null,
    color: null,
    size: null,
    category_id: null,
  },
  categories_data: [],
  loading: false,
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    loading(state, action) {
      state.loading = true
    },
    set(state, action) {
      const items = action.payload
      state.data = [...items]
      state.loading = false
    },
    setcategories(state, action) {
      const items = action.payload
      console.info(items)
      state.categories_data = [...items]
      state.loading = false
    },
    add(state, action) {
      const item = action.payload
      state.data = [...state.data, item]
      state.loading = false
    },
    remove(state, { payload: { id: itemId } }) {
      state.data = state.data.filter(({ id }) => id != itemId)
      state.loading = false
    },

    update(state, { payload }) {
      const { id: itemId } = payload;
      const data = [...state.data,]
      const index = data.findIndex(({ id }) => itemId)
      data[index] = { ...data[index], ...payload }
      state.data = data
      state.loading = false
    },

    updatefield(state, { payload }) {
      const { name, value } = payload
      let fields = { ...state.fields }
      fields[name] = value
      state.fields = fields
      state.loading = false
    },

    resetfields(state, { payload }) {
      state.fields = { ...initialState.fields }
      state.loading = false
    },

    setfields(state, { payload }) {
      state.fields = { ...payload }
      state.loading = false
    }
  },
})

const { set, add, remove,
  update, loading,
  updatefield,
  setcategories,
  resetfields, setfields, } = productSlice.actions


function* fetch() {
  let response = []
  yield (put(loading()))
  try {
    response = yield ProductsAPI.list()
  } catch (err) {
    console.error(err);
  } finally {
    yield put(set(response.data))
  }
}

function* fetchfields({ payload }) {
  yield (put(loading()))
  const { id } = payload
  let response = []
  try {
    response = yield ProductsAPI.get(id)
  } catch (err) {
    console.error(err);
  } finally {
    yield put(setfields(response.data))
  }
}

function* submitfields({ push, payload }) {
  yield (put(loading()))
  let response = null
  const {
    id
  } = payload
  try {
    if (!id) {
      response = yield ProductsAPI.post(payload)
    } else {
      delete payload.id
      response = yield ProductsAPI.update(id, payload)
    }
  } catch (err) {

  } finally {
    yield push('/products/list/')
  }
}

function* setfield({ payload }) {
  yield (put(loading()))
  const { name, value } = payload
  yield put(updatefield({ name, value }))
}

function* resetform() {
  yield (put(loading()))
  yield put(resetfields())
}

function* deleteitem({ payload: id }) {
  let response = {}
  try {
    response = yield ProductsAPI.remove(id)
    yield put(remove({ id }))
  } catch (err) {

  } finally {
  }
}

function* fetchcategories() {
  let response = []
  try {
    response = yield CategoriesAPI.list()
    yield put(setcategories(response.data))
  } catch (err) {

  } finally {

  }
}

export function* saga() {
  yield takeEvery('product/fetch', fetch);
  yield takeEvery('product/fetchfields', fetchfields);
  yield takeLatest('product/setfield', setfield);
  yield takeLatest('product/clearfields', resetform);
  yield takeLatest('product/submitfields', submitfields);
  yield takeLatest('product/delete', deleteitem);
  yield takeLatest('product/fetchcategories', fetchcategories);
}


export default productSlice.reducer
