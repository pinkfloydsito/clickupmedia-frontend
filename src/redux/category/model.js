import { createSlice, createAction } from '@reduxjs/toolkit'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {
  CategoriesAPI
} from '../../api/rest-api';

const initialState = {
  data: [],

  /*Fields */
  fields: {
    name: null,
    id: null,
    price: null,
    color: null,
    size: null,
  },
  loading: false,
}

const categorySlice = createSlice({
  name: 'category',
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
    }
  },
})

const { set, add, remove, update, loading, updatefield, resetfields, setfields, } = categorySlice.actions


function* fetch() {
  let response = []
  yield (put(loading()))
  try {
    response = yield CategoriesAPI.list()
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
    response = yield CategoriesAPI.get(id)
  } catch (err) {
    console.error(err);
  } finally {
    yield put(setfields(response.data))
  }
}

function* submitfields({ payload }) {
  yield (put(loading()))
  let response = null
  const {
    id
  } = payload
  try {
    if (!id) {
      response = yield CategoriesAPI.post(payload)
    } else {
      delete payload.id
      response = yield CategoriesAPI.update(id, payload)
    }
  } catch (err) {

  } finally {
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
    response = yield CategoriesAPI.remove(id)
    yield put(remove({ id }))
  } catch (err) {

  } finally {
  }
}

export function* saga() {
  yield takeEvery('category/fetch', fetch);
  yield takeEvery('category/fetchfields', fetchfields);
  yield takeLatest('category/setfield', setfield);
  yield takeLatest('category/clearfields', resetform);
  yield takeLatest('category/submitfields', submitfields);
  yield takeLatest('category/delete', deleteitem);
}


export default categorySlice.reducer
