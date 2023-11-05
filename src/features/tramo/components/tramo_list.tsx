import { FC, Fragment } from 'react'
import { useAppSelector } from '../../app'
import { Divider, List, ListItem, ListItemText } from '@mui/material'
import { TramoListItem } from './tramo_list_item'

export const TramoList: FC = () => {
  const state = useAppSelector((st) => st.tramos)

  return (
    <List sx={{ bgcolor: 'background.paper' }}>
      {state.tramos.length === 0 && (
        <ListItem>
          <ListItemText primary="Sin tramos creados" />
        </ListItem>
      )}
      {state.tramos.map((c, idx) => (
        <Fragment key={c.id}>
          <TramoListItem tramo={c} />
          {idx !== state.tramos.length - 1 && (
            <Divider variant="inset" component="li" />
          )}
        </Fragment>
      ))}
    </List>
  )
}
