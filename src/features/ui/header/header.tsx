import { Box, Typography } from '@mui/material'
import { FC } from 'react'

export const Header: FC = () => {
  return (
    <Box
      component="header"
      sx={{
        paddingTop: '30px',
        paddingBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="noprint"
    >
      <Box
        sx={{
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            pointerEvents: 'none',
            right: '230px',
            top: '-20px',
          }}
        >
          <Box component="img" src="/logo.png" sx={{ width: '150px' }} />
        </Box>
        <Typography variant="h3">Valls Rally</Typography>
        <Typography sx={{ marginTop: '8px' }}>¡A por todas!</Typography>
      </Box>
    </Box>
  )
}
