import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { FC } from 'react'
import { useAppSelector } from '../../app'
import { CitaType } from '../cita.types'
import { CitaListItemText } from './cita_list_item_text'

type Props = {
  label?: string
  citaIdx: number | null
  handleSelect: (idx: number | null, cita?: CitaType) => void
}

export const CitaSelector: FC<Props> = ({
  citaIdx,
  handleSelect,
  label = 'Cita',
}) => {
  const citas = useAppSelector((st) => st.citas)

  const index = citaIdx !== null ? citaIdx + 1 : null

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={index || ''}
          onChange={(e) => {
            const idx = e.target.value ? Number(e.target.value) : null
            handleSelect(
              idx !== null ? idx - 1 : null,
              idx !== null ? citas[idx - 1] : undefined
            )
          }}
          label={label}
        >
          {citas.length === 0 ? (
            <MenuItem value="">
              <em>Sin citas agregadas</em>
            </MenuItem>
          ) : (
            citas.map((c, idx) => (
              <MenuItem key={c.id} value={idx + 1}>
                <CitaListItemText citaIdx={idx + 1} cita={c} />
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </div>
  )
}
