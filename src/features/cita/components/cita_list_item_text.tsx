import { FC } from 'react'
import { CitaType } from '../cita.types'
import { ListItemText } from '@mui/material'

type Props = {
  citaIdx: number
  cita: CitaType
}

export const CitaListItemText: FC<Props> = ({ citaIdx: idx, cita: c }) => {
  return (
    <ListItemText
      primaryTypographyProps={{
        color: c.esTeorico ? 'error' : undefined,
      }}
      primary={
        <>
          <b>#{idx}</b>
          &nbsp;&nbsp;&nbsp;{c.metro}
        </>
      }
      secondary={c.nombre}
    />
  )
}
