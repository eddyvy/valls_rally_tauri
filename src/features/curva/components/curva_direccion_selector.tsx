import { TurnLeft, TurnRight } from '@mui/icons-material'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import { FC } from 'react'

type Props = {
  label?: string
  isRight: boolean
  handleSelect: (isRight: boolean) => void
}

export const CurvaDireccionSelector: FC<Props> = ({
  isRight,
  handleSelect,
  label = 'Cita',
}) => {
  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={isRight}
          onChange={(e) => {
            const isRight = e.target.value === 'true'
            handleSelect(isRight)
          }}
          label={label}
        >
          <MenuItem value="true">
            <Box sx={{ display: 'flex', gap: '3px' }}>
              <TurnRight />
              <Typography>Derecha</Typography>
            </Box>
          </MenuItem>
          <MenuItem value="false">
            <Box sx={{ display: 'flex', gap: '3px' }}>
              <TurnLeft />
              <Typography>Izquierda</Typography>
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
