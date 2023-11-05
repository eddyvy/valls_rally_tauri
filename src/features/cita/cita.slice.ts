import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CitaType } from './cita.types'

const initialState: CitaType[] = []

export const citasSlice = createSlice({
  name: 'citas',
  initialState,
  reducers: {
    setState(_state, action: PayloadAction<typeof initialState>) {
      return action.payload
    },
    set: (_state, action: PayloadAction<CitaType[]>) => {
      return action.payload
    },
  },
})

export const citasActions = citasSlice.actions
export const citasReducer = citasSlice.reducer
