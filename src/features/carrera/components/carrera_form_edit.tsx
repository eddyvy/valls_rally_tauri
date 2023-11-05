import { Close, Edit } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material'
import { FC, useState } from 'react'
import { CarreraListEdit } from './carrera_list_edit'

export const CarreraFormEdit: FC = () => {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button
        variant="contained"
        size="small"
        startIcon={<Edit />}
        onClick={() => setOpen(true)}
      >
        Editar Carreras
      </Button>
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
          Editar Carreras
        </DialogTitle>
        <DialogContent sx={{ minWidth: '400px' }}>
          <CarreraListEdit />
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
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
