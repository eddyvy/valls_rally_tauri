import { Divider, List } from '@mui/material'
import { FC, Fragment, memo } from 'react'
import { useAppSelector } from '../../app'
import { CarreraListItemEdit } from './carrera_list_item_edit'

export const CarreraListEdit: FC = memo(() => {
  const carreras = useAppSelector((st) => st.carreras.carreras)

  return (
    <List sx={{ bgcolor: 'background.paper', maxWidth: '600px' }}>
      {carreras.map((c, idx) => (
        <Fragment key={c.id}>
          <CarreraListItemEdit carrera={c} />
          {idx !== carreras.length - 1 && <Divider component="li" />}
        </Fragment>
      ))}
    </List>
  )
})
