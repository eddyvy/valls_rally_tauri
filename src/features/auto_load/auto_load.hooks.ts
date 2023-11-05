import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app'
import { AutoLoadStatus, autoLoadActions } from '.'
import { useParams } from 'react-router-dom'
import { carrerasActions, useCarreras } from '../carrera'
import { tramosActions, useTramos } from '../tramo'
import { useCitas } from '../cita'
import { useCurvas } from '../curva'

export const useAutoLoad = () => {
  const params = useParams()
  const dispatch = useAppDispatch()
  const status = useAppSelector((st) => st.autoLoad.status)
  const { readCarreras } = useCarreras()
  const { readTramosByCarreraId } = useTramos()
  const { readCitasByTramoId } = useCitas()
  const { readCurvasByTramoId } = useCurvas()

  const load = async () => {
    await readCarreras()

    const cId = Number(params?.carreraId)

    if (isNaN(cId)) return

    dispatch(carrerasActions.select(cId))

    await readTramosByCarreraId(cId)

    const tId = Number(params?.tramoId)

    if (isNaN(tId)) return

    dispatch(tramosActions.select(tId))

    await readCitasByTramoId(tId)
    await readCurvasByTramoId(tId)
  }

  useEffect(() => {
    if (status !== AutoLoadStatus.INITIAL) return

    dispatch(autoLoadActions.set(AutoLoadStatus.STARTED))

    load().finally(() => dispatch(autoLoadActions.set(AutoLoadStatus.FINISHED)))
  }, [dispatch])
}
