import { FC } from 'react'
import { CarreraForm, CarreraFormEdit, CarreraList } from '../features/carrera'
import { Box, Typography } from '@mui/material'

export const HomePage: FC = () => {
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
        <Typography variant="h6">Mis carreras</Typography>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <CarreraForm />
          <CarreraFormEdit />
        </Box>
      </Box>
      <CarreraList />
    </Box>
  )
}
