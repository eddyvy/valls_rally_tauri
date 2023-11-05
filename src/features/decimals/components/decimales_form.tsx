import { Close } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../app'
import { decimalsActions } from '..'
import { useCitas } from '../../cita'

type Props = {
  open: boolean
  handleClose: () => void
}

const options = [0, 1, 2, 3]

export const DecimalesForm: FC<Props> = ({ open, handleClose }) => {
  const dispatch = useAppDispatch()
  const decimales = useAppSelector((st) => st.decimals)
  const { readCitas } = useCitas()

  const handleExit = () => {
    readCitas()
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleExit}>
      <IconButton
        aria-label="close"
        onClick={handleExit}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
      <DialogTitle>Modificar decimales</DialogTitle>
      <DialogContent sx={{ minWidth: '400px' }}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Decimales</InputLabel>
          <Select
            value={decimales}
            onChange={(e) => {
              const num = Number(e.target.value)
              if (num !== decimales) {
                dispatch(decimalsActions.set(num))
              }
            }}
            label="Decimales"
          >
            {options.map((d) => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleExit}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}
