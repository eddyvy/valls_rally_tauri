import { configureStore } from '@reduxjs/toolkit'
import { citasReducer } from '../cita'
import { carrerasReducer } from '../carrera'
import { tramosReducer } from '../tramo'
import { autoLoadReducer } from '../auto_load'
import { curvasReducer } from '../curva'
import { decimalsReducer } from '../decimals'

export const store = configureStore({
  reducer: {
    carreras: carrerasReducer,
    tramos: tramosReducer,
    citas: citasReducer,
    curvas: curvasReducer,
    decimals: decimalsReducer,
    autoLoad: autoLoadReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
