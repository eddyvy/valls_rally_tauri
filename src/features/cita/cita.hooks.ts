import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../app'
import { invoke } from '@tauri-apps/api'
import { citasActions } from './cita.slice'
import { CitaTypeSnakeCase } from './cita.types'

export const useCitas = () => {
  const dispatch = useAppDispatch()
  const tramoId = useAppSelector((st) => st.tramos.selected?.id)
  const decimals = useAppSelector((st) => st.decimals)
  const roundDec = decimals * 10 || 1

  const readCitasByTramoId = useCallback(
    async (tId: number) => {
      const citas = await invoke<CitaTypeSnakeCase[]>('get_citas', {
        tramoId: tId,
      })
      dispatch(
        citasActions.set(
          citas.map((c) => ({
            id: c.id,
            tramoId: c.tramo_id,
            nombre: c.nombre,
            metro: c.metro,
            esTeorico: c.es_teorico,
            metroCalculado:
              Math.round(Number(c.metro_calculado) * roundDec) / roundDec,
            diff: Math.round(Number(c.diff) * roundDec) / roundDec,
            curvaData: c.curva_data
              ? {
                  grados: c.curva_data.grados,
                  isRight: c.curva_data.is_right,
                }
              : undefined,
          }))
        )
      )
    },
    [dispatch, decimals]
  )

  const readCitas = useCallback(async () => {
    if (!tramoId) return
    return readCitasByTramoId(tramoId)
  }, [tramoId, decimals])

  const addCita = useCallback(
    async (nombre: string, metro: number, metroTeorico?: number) => {
      if (!tramoId) return

      await invoke('add_cita', {
        cita: {
          tramo_id: tramoId,
          nombre: nombre,
          metro,
          metro_teorico:
            metroTeorico === 0 ? metroTeorico : metroTeorico || null,
        },
      })
      await readCitas()
    },
    [tramoId]
  )

  const editCita = useCallback(
    async (
      id: number,
      nombre: string,
      metro: number,
      metroTeorico?: number
    ) => {
      if (!tramoId) return
      await invoke('modify_cita', {
        id,
        cita: {
          tramo_id: tramoId,
          nombre: nombre,
          metro,
          metro_teorico:
            metroTeorico === 0 ? metroTeorico : metroTeorico || null,
        },
      })
      await readCitas()
    },
    [tramoId]
  )

  const removeCita = useCallback(
    async (id: number) => {
      await invoke('remove_cita', {
        id,
      })
      await readCitas()
    },
    [tramoId]
  )

  return { readCitas, readCitasByTramoId, addCita, editCita, removeCita }
}
