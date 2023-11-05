import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: number = 0

export const decimalsSlice = createSlice({
  name: 'decimals',
  initialState,
  reducers: {
    setState(_state, action: PayloadAction<typeof initialState>) {
      return action.payload
    },
    set: (_state, action: PayloadAction<number>) => {
      return action.payload
    },
  },
})

export const decimalsActions = decimalsSlice.actions
export const decimalsReducer = decimalsSlice.reducer
