import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AutoLoadState, AutoLoadStatus } from './auto_load.types'

const initialState: AutoLoadState = { status: AutoLoadStatus.INITIAL }

export const autoLoadSlice = createSlice({
  name: 'autoLoad',
  initialState,
  reducers: {
    set(state, action: PayloadAction<AutoLoadState['status']>) {
      state.status = action.payload
    },
  },
})

export const autoLoadActions = autoLoadSlice.actions
export const autoLoadReducer = autoLoadSlice.reducer
