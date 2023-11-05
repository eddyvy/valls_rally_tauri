import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../app'
import { invoke } from '@tauri-apps/api'
import { CurvaTypeSnakeCase } from './curva.types'
import { curvasActions } from './curva.slice'
import { useCitas } from '../cita'

export const useCurvas = () => {
  const dispatch = useAppDispatch()
  const tramoId = useAppSelector((st) => st.tramos.selected?.id)
  const { readCitas } = useCitas()

  const readCurvasByTramoId = useCallback(
    async (tId: number) => {
      const curvas = await invoke<CurvaTypeSnakeCase[]>('get_curvas', {
        tramoId: tId,
      })
      dispatch(
        curvasActions.set(
          curvas.map((c) => ({
            id: c.id,
            tramoId: c.tramo_id,
            citaInicialId: c.cita_inicial_id,
            citaFinalId: c.cita_final_id,
            grados: c.grados,
            isRight: c.is_right,
          }))
        )
      )
    },
    [dispatch]
  )

  const readCurvas = useCallback(async () => {
    if (!tramoId) return
    return readCurvasByTramoId(tramoId)
  }, [tramoId])

  const addCurva = useCallback(
    async (
      citaInicialId: number,
      citaFinalId: number,
      grados: number,
      isRight: boolean
    ) => {
      if (!tramoId) return

      await invoke('add_curva', {
        curva: {
          tramo_id: tramoId,
          cita_inicial_id: citaInicialId,
          cita_final_id: citaFinalId,
          grados,
          is_right: isRight,
        },
      })
      await readCurvas()
      await readCitas()
    },
    [tramoId]
  )

  const editCurva = useCallback(
    async (
      id: number,
      citaInicialId: number,
      citaFinalId: number,
      grados: number,
      isRight: boolean
    ) => {
      if (!tramoId) return
      await invoke('modify_curva', {
        id,
        curva: {
          tramo_id: tramoId,
          cita_inicial_id: citaInicialId,
          cita_final_id: citaFinalId,
          grados,
          is_right: isRight,
        },
      })
      await readCurvas()
      await readCitas()
    },
    [tramoId]
  )

  const removeCurva = useCallback(
    async (id: number) => {
      await invoke('remove_curva', {
        id,
      })
      await readCurvas()
      await readCitas()
    },
    [tramoId]
  )

  return { readCurvas, readCurvasByTramoId, addCurva, editCurva, removeCurva }
}
