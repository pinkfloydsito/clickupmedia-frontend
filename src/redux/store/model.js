import { createSlice, createAction } from '@reduxjs/toolkit'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {
  StoresAPI, ProductsAPI
} from '../../api/rest-api';

const initialState = {
  data: [],
  products: [],

  /*Fields */
  fields: {
    city: null,
    country: null,
    zip_code: null,
    street: null,
    name: null,
    id: null,
    number: null,
    products: [],
  },
  loading: false,
}

const storeSlice = createSlice({
  name: 'store',
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
    },
    setproducts(state, { payload }) {
      state.products = [...payload]
      state.loading = false
    },
  },
})

const { setproducts, set, add, remove, update, loading, updatefield, resetfields, setfields, } = storeSlice.actions


function* fetch() {
  let response = []
  yield (put(loading()))
  try {
    response = yield StoresAPI.list()
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
    response = yield StoresAPI.get(id)
  } catch (err) {
    console.error(err);
  } finally {
    yield put(setfields(response.data))
  }
}

function* fetchproducts({ payload }) {
  yield (put(loading()))
  let response = []
  try {
    response = yield ProductsAPI.list()
  } catch (err) {
    console.error(err);
  } finally {
    yield put(setproducts(response.data))
  }
}

function* submitfields({ push, payload }) {
  yield (put(loading()))
  let response = null
  const {
    id
  } = payload
  try {
    delete payload.push
    if (!id) {
      response = yield StoresAPI.post(payload)
    } else {
      delete payload.id
      response = yield StoresAPI.update(id, payload)
    }
  } catch (err) {

  } finally {
    yield push('/stores/list/')
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
    response = yield StoresAPI.remove(id)
    yield put(remove({ id }))
  } catch (err) {

  } finally {
  }
}

export function* saga() {
  yield takeEvery('store/fetch', fetch);
  yield takeEvery('store/fetchfields', fetchfields);
  yield takeEvery('store/fetchproducts', fetchproducts);
  yield takeLatest('store/setfield', setfield);
  yield takeLatest('store/clearfields', resetform);
  yield takeLatest('store/submitfields', submitfields);
  yield takeLatest('store/delete', deleteitem);
}


export default storeSlice.reducer
