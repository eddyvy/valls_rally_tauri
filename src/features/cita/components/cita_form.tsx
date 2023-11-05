import { Close } from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material'
import { FC, FormEvent, useState } from 'react'
import { useCitas } from '../cita.hooks'
import { ErrorSnack } from '../../ui'

type Props = {
  open: boolean
  handleClose: () => void
}

export const CitaForm: FC<Props> = ({ handleClose, open }) => {
  const { addCita } = useCitas()

  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const target = e.target as any

    const nombre = target['nombre']?.value
    const metro = Number(target['metro']?.value)
    const metroTeorico =
      target['metroTeorico']?.value === '0'
        ? 0
        : target['metroTeorico']?.value
        ? Number(target['metroTeorico']?.value)
        : undefined

    if (metro < 0 || (typeof metroTeorico === 'number' && metroTeorico < 0)) {
      setError('No se permiten metros negativos')
      return
    }

    if (!nombre || isNaN(metro) || (metroTeorico && isNaN(metroTeorico))) {
      setError('Campos no válidos')
      return
    }

    addCita(nombre, metro, metroTeorico)

    handleClose()
  }

  return (
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
      <DialogTitle>Nueva Cita</DialogTitle>
      <DialogContent sx={{ minWidth: '400px' }}>
        <TextField
          autoFocus
          autoComplete="none"
          margin="dense"
          id="nombreCita"
          name="nombre"
          label="Nombre de la cita"
          type="text"
          fullWidth
          variant="standard"
          required
          defaultValue="Cita"
        />
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <TextField
            autoComplete="none"
            margin="dense"
            id="metroCita"
            name="metro"
            label="Metros medidos"
            type="number"
            variant="standard"
            required
          />
          <TextField
            autoComplete="none"
            margin="dense"
            id="metroTeoricoCita"
            name="metroTeorico"
            label="Metros Organización (opcional)"
            type="number"
            variant="standard"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" type="submit">
          Agregar
        </Button>
      </DialogActions>
      <ErrorSnack error={error} setError={setError} />
    </Dialog>
  )
}
