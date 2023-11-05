import { FC } from 'react'
import { TramoType } from '../tramo.types'
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { Route } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../../app'
import { useNavigate } from 'react-router-dom'
import { tramosActions } from '..'
import { useCitas } from '../../cita'
import { useCurvas } from '../../curva'

type Props = {
  tramo: TramoType
}

export const TramoListItem: FC<Props> = ({ tramo }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const carreraSelected = useAppSelector((st) => st.carreras.selected)
  const { readCitasByTramoId } = useCitas()
  const { readCurvasByTramoId } = useCurvas()

  const handleClick = () => {
    dispatch(tramosActions.select(tramo.id))
    readCitasByTramoId(tramo.id)
    readCurvasByTramoId(tramo.id)
    if (carreraSelected) {
      navigate(`/${carreraSelected.id}/${tramo.id}`)
    }
  }

  return (
    <ListItemButton onClick={handleClick}>
      <ListItemAvatar>
        <Avatar>
          <Route />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={tramo.nombre} />
    </ListItemButton>
  )
}
