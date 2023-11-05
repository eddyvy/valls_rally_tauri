import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { CitaActions, CitaTable } from '../features/cita'
import { useAppSelector } from '../features/app'

export const CitasPage: FC = () => {
  const tramo = useAppSelector((st) => st.tramos.selected)
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
        <Typography variant="h6">
          {tramo ? `${tramo.nombre}` : 'Citas'}
        </Typography>
        <CitaActions />
      </Box>
      <CitaTable />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '7px 7px 0 0',
        }}
      >
        {tramo?.factor !== undefined && (
          <Typography variant="caption">
            K = {tramo.factor.toFixed(2)}
          </Typography>
        )}
      </Box>
    </Box>
  )
}
