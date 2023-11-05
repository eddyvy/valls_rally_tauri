import { Add, Close } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material'
import { FC, FormEvent, useState } from 'react'
import { useTramos } from '../tramo.hooks'

const DEFAULT_FACTOR = 1

export const TramoForm: FC = () => {
  const { addTramo } = useTramos()

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const target = e.target as any

    if (target['nombre']?.value) {
      addTramo(target['nombre']?.value, DEFAULT_FACTOR)
    }

    handleClose()
  }

  return (
    <>
      <Button
        variant="contained"
        size="small"
        startIcon={<Add />}
        onClick={() => setOpen(true)}
      >
        Agregar Tramo
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        component="form"
        onSubmit={handleSubmit}
      >
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
        <DialogTitle>Nueva Tramo</DialogTitle>
        <DialogContent sx={{ minWidth: '400px' }}>
          <TextField
            autoFocus
            autoComplete="none"
            margin="dense"
            id="nombreTramo"
            name="nombre"
            label="Nombre de la tramo"
            type="text"
            fullWidth
            variant="standard"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" type="submit">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
