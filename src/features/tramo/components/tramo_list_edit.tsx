import { Divider, List } from '@mui/material'
import { FC, Fragment, memo } from 'react'
import { useAppSelector } from '../../app'
import { TramoListItemEdit } from './tramo_list_item_edit'

export const TramoListEdit: FC = memo(() => {
  const tramos = useAppSelector((st) => st.tramos.tramos)

  return (
    <List sx={{ bgcolor: 'background.paper', maxWidth: '600px' }}>
      {tramos.map((c, idx) => (
        <Fragment key={c.id}>
          <TramoListItemEdit tramo={c} />
          {idx !== tramos.length - 1 && <Divider component="li" />}
        </Fragment>
      ))}
    </List>
  )
})
