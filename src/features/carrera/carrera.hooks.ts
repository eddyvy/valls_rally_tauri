import { useAppDispatch } from '../app'
import { invoke } from '@tauri-apps/api'
import { CarreraType } from './carrera.types'
import { carrerasActions } from './carrera.slice'

export const useCarreras = () => {
  const dispatch = useAppDispatch()

  const readCarreras = async () => {
    const carreras = await invoke<CarreraType[]>('get_carreras')
    dispatch(carrerasActions.set(carreras))
  }

  const addCarrera = async (nombre: string) => {
    await invoke('add_carrera', {
      carrera: { nombre },
    })
    await readCarreras()
  }

  const editCarrera = async (id: number, nombre: string) => {
    await invoke('modify_carrera', {
      id,
      carrera: { nombre },
    })
    await readCarreras()
  }

  const moveCarrera = async (id: number, newPos: number) => {
    await invoke('update_carrera_orden', {
      id,
      orden: newPos,
    })
    await readCarreras()
  }

  const removeCarrera = async (id: number) => {
    await invoke('remove_carrera', {
      id,
    })
    await readCarreras()
  }

  return { readCarreras, addCarrera, editCarrera, moveCarrera, removeCarrera }
}
