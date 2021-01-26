import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  selected: null,
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    add(state, action) {
      const item = action.payload
      state.data = [...state.data, item]
    },
    remove(state, { payload: { id: itemId } }) {
      state.data = state.filter(({ id }) => id === itemId)
    },

    update(state, { payload }) {
      const { id: itemId } = payload;
      const data = [...state.data,]
      const index = data.findIndex(({ id }) => itemId)
      data[index] = { ...data[index], ...payload }
      state.data = data
    },
  },
})

export const { add, remove, update } = categorySlice.actions
export default categorySlice.reducer