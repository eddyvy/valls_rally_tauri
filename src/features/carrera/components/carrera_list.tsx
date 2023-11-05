import { Divider, List, ListItem, ListItemText } from '@mui/material'
import { FC, Fragment } from 'react'
import { useAppSelector } from '../../app'
import { CarreraListItem } from './carrera_list_item'

export const CarreraList: FC = () => {
  const state = useAppSelector((st) => st.carreras)

  return (
    <List sx={{ bgcolor: 'background.paper' }}>
      {state.carreras.length === 0 && (
        <ListItem>
          <ListItemText primary="Sin carreras creadas" />
        </ListItem>
      )}
      {state.carreras.map((c, idx) => (
        <Fragment key={c.id}>
          <CarreraListItem carrera={c} />
          {idx !== state.carreras.length - 1 && (
            <Divider variant="inset" component="li" />
          )}
        </Fragment>
      ))}
    </List>
  )
}
