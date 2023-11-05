import { FC } from 'react'
import { TramoForm, TramoFormEdit, TramoList } from '../features/tramo'
import { Box, Typography } from '@mui/material'

export const TramosPage: FC = () => {
  return (
    <Box>
      <Box
        sx={{
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">Tramos</Typography>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <TramoForm />
          <TramoFormEdit />
        </Box>
      </Box>
      <TramoList />
    </Box>
  )
}
