import { FC } from 'react'
import { CarreraType } from '../carrera.types'
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { SportsScore } from '@mui/icons-material'
import { useAppDispatch } from '../../app'
import { useNavigate } from 'react-router-dom'
import { carrerasActions } from '..'
import { useTramos } from '../../tramo'

type Props = {
  carrera: CarreraType
}

export const CarreraListItem: FC<Props> = ({ carrera }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { readTramosByCarreraId } = useTramos()

  const handleClick = () => {
    dispatch(carrerasActions.select(carrera.id))
    readTramosByCarreraId(carrera.id)
    navigate(`/${carrera.id}`)
  }

  return (
    <ListItemButton onClick={handleClick}>
      <ListItemAvatar>
        <Avatar>
          <SportsScore />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={carrera.nombre} />
    </ListItemButton>
  )
}
