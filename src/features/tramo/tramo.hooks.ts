import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../app'
import { invoke } from '@tauri-apps/api'
import { TramoType } from './tramo.types'
import { tramosActions } from './tramo.slice'

export const useTramos = () => {
  const dispatch = useAppDispatch()
  const carreraId = useAppSelector((st) => st.carreras.selected?.id)

  const readTramos = useCallback(async () => {
    if (!carreraId) return
    const tramos = await invoke<TramoType[]>('get_tramos', {
      carreraId,
    })
    dispatch(tramosActions.set(tramos))
  }, [carreraId])

  const readTramosByCarreraId = useCallback(async (cId: number) => {
    const tramos = await invoke<TramoType[]>('get_tramos', {
      carreraId: cId,
    })
    dispatch(tramosActions.set(tramos))
  }, [])

  const addTramo = useCallback(
    async (nombre: string, factor: number) => {
      if (!carreraId) return

      await invoke('add_tramo', {
        tramo: { nombre, carrera_id: carreraId, factor },
      })
      await readTramos()
    },
    [carreraId]
  )

  const editTramo = useCallback(
    async (id: number, nombre: string, factor: number) => {
      if (!carreraId) return
      await invoke('modify_tramo', {
        id,
        tramo: { nombre, carrera_id: carreraId, factor },
      })
      await readTramos()
    },
    [carreraId]
  )

  const moveTramo = useCallback(
    async (id: number, newPos: number) => {
      await invoke('update_tramo_orden', {
        id,
        orden: newPos,
      })
      await readTramos()
    },
    [carreraId]
  )

  const removeTramo = useCallback(
    async (id: number) => {
      await invoke('remove_tramo', {
        id,
      })
      await readTramos()
    },
    [carreraId]
  )

  return {
    readTramos,
    readTramosByCarreraId,
    addTramo,
    editTramo,
    moveTramo,
    removeTramo,
  }
}
