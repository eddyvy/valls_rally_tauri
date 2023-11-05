import { Close } from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material'
import { FC } from 'react'
import { CurvaList } from '.'
import { useAppSelector } from '../../app'
import { CurvaAdd } from './curva_add'
import { TramoFactor } from '../../tramo'

type Props = {
  open: boolean
  handleClose: () => void
}

export const CurvaForm: FC<Props> = ({ open, handleClose }) => {
  const tramo = useAppSelector((st) => st.tramos.selected)

  return (
    <Dialog open={open} onClose={handleClose} fullScreen>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
      <DialogTitle sx={{ borderBottom: '1px solid grey' }}>
        {tramo ? `Curvas de ${tramo.nombre}` : 'Curvas'}
      </DialogTitle>
      <DialogContent sx={{ minWidth: '400px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          <TramoFactor />
          <CurvaAdd />
        </Box>
        <CurvaList />
      </DialogContent>
      <DialogActions
        sx={{
          padding: '20px',
          borderTop: '1px solid grey',
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={handleClose}
          sx={{ minWidth: '120px' }}
        >
          Hecho
        </Button>
      </DialogActions>
    </Dialog>
  )
}
