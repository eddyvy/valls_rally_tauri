import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CarreraState, CarreraType } from './carrera.types'

const initialState: CarreraState = {
  selected: null,
  carreras: [],
}

export const carrerasSlice = createSlice({
  name: 'carreras',
  initialState,
  reducers: {
    setState(_state, action: PayloadAction<typeof initialState>) {
      return action.payload
    },
    set(state, action: PayloadAction<CarreraType[]>) {
      state.selected = null
      state.carreras = action.payload
    },
    select(state, action: PayloadAction<number>) {
      const newSelected = state.carreras.find((t) => t.id === action.payload)
      if (!newSelected) return
      state.selected = newSelected
    },
  },
})

export const carrerasActions = carrerasSlice.actions
export const carrerasReducer = carrerasSlice.reducer
