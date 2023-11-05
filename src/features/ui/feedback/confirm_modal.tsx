import { Close } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'
import { FC } from 'react'

type Props = {
  open: boolean
  handleClose: () => void
  handleConfirm: () => void
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
}

export const ConfirmModal: FC<Props> = ({
  open,
  handleClose,
  handleConfirm,
  title = '¿Estás seguro?',
  description = '¿Seguro que deseas realiza esta acción?',
  confirmText = 'Continuar',
  cancelText = 'Cancelar',
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
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
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ minWidth: '400px' }}>
        <Typography>{description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleConfirm}>
          {confirmText}
        </Button>
        <Button variant="contained" color="inherit" onClick={handleClose}>
          {cancelText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
