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
import { useCurvas } from '..'
import { CitaSelector } from '../../cita'
import { CurvaDireccionSelector } from './curva_direccion_selector'
import { ErrorSnack } from '../../ui'
import { useAppSelector } from '../../app'

export const CurvaAdd: FC = () => {
  const citas = useAppSelector((st) => st.citas)
  const curvas = useAppSelector((st) => st.curvas)
  const { addCurva } = useCurvas()

  const [open, setOpen] = useState(false)
  const [citaIniIdx, setCitaIniIdx] = useState<number | null>(null)
  const [citaFinIdx, setCitaFinIdx] = useState<number | null>(null)
  const [isRight, setIsRight] = useState(true)

  const [error, setError] = useState<string | null>(null)

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const target = e.target as any

    const grados = Number(target['grados']?.value)

    if (grados < 0) {
      setError('No pueden haber grados negativos')
      return
    }

    if (isNaN(grados)) {
      setError('Campo de grados no válido')
      return
    }

    if (
      (!citaIniIdx && citaIniIdx !== 0) ||
      (!citaFinIdx && citaFinIdx !== 0)
    ) {
      setError('Selecciona el inicio y fin de la curva')
      return
    }

    if (citaIniIdx === citaFinIdx) {
      setError('El inicio y el fin no pueden ser el mismo')
      return
    }

    if (citaIniIdx > citaFinIdx) {
      setError('El inicio seleccionado está despúes del final')
      return
    }

    const citaIni = citas[citaIniIdx]
    const citaFin = citas[citaFinIdx]

    if (citaFin.esTeorico) {
      setError('No se puede utilizar un punto teórico como fin de curva')
      return
    }

    for (const cur of curvas) {
      if (cur.citaInicialId === citaIni.id) {
        setError('Ya hay una curva que empieza por esa cita')
        return
      }

      if (cur.citaFinalId === citaFin.id) {
        setError('Ya hay una curva que termina por esa cita')
        return
      }

      if (cur.citaFinalId === citaIni.id || cur.citaInicialId === citaFin.id) {
        setError(
          'No puedes asignar a una cita el fin de una curva y el principio de ota curva'
        )
        return
      }
    }

    addCurva(citas[citaIniIdx].id, citas[citaFinIdx].id, grados, isRight)

    handleClose()
  }

  return (
    <>
      <Button variant="contained" size="small" onClick={() => setOpen(true)}>
        Agregar Curva
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
        <DialogTitle>Nueva Curva</DialogTitle>
        <DialogContent sx={{ minWidth: '400px' }}>
          <Box
            sx={{
              display: 'grid',
              gap: '20px',
              gridTemplateColumns: '1fr 1fr',
            }}
          >
            <CitaSelector
              citaIdx={citaIniIdx}
              handleSelect={(idx) => {
                setCitaIniIdx(idx)
              }}
              label="Inicio curva"
            />
            <CitaSelector
              citaIdx={citaFinIdx}
              handleSelect={(idx) => {
                setCitaFinIdx(idx)
              }}
              label="Fin curva"
            />
            <TextField
              autoComplete="none"
              margin="dense"
              id="gradosCita"
              name="grados"
              label="Grados de la curva"
              type="number"
              variant="standard"
              required
            />
            <CurvaDireccionSelector
              isRight={isRight}
              handleSelect={(isR) => setIsRight(isR)}
              label="Dirección de la curva"
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
    </>
  )
}
