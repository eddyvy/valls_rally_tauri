import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CurvaType } from './curva.types'

const initialState: CurvaType[] = []

export const curvasSlice = createSlice({
  name: 'curvas',
  initialState,
  reducers: {
    setState(_state, action: PayloadAction<typeof initialState>) {
      return action.payload
    },
    set: (_state, action: PayloadAction<CurvaType[]>) => {
      return action.payload
    },
  },
})

export const curvasActions = curvasSlice.actions
export const curvasReducer = curvasSlice.reducer
