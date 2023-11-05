import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TramoState, TramoType } from './tramo.types'

const initialState: TramoState = {
  selected: null,
  tramos: [],
}

export const tramosSlice = createSlice({
  name: 'tramos',
  initialState,
  reducers: {
    setState(_state, action: PayloadAction<typeof initialState>) {
      return action.payload
    },
    set(state, action: PayloadAction<TramoType[]>) {
      state.selected = null
      state.tramos = action.payload
    },
    select(state, action: PayloadAction<number>) {
      const newSelected = state.tramos.find((t) => t.id === action.payload)
      if (!newSelected) return
      state.selected = newSelected
    },
  },
})

export const tramosActions = tramosSlice.actions
export const tramosReducer = tramosSlice.reducer
