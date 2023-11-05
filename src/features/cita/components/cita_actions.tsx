import { Add, Gesture, Print, Calculate } from '@mui/icons-material'
import { Button, ButtonGroup, Tooltip } from '@mui/material'
import { FC, useState } from 'react'
import { printApp } from '../../print'
import { CitaForm } from './cita_form'
import { CurvaForm } from '../../curva'
import { DecimalesForm } from '../../decimals'

export const CitaActions: FC = () => {
  const [openAdd, setOpenAdd] = useState(false)
  const [openCurvas, setOpenCurvas] = useState(false)
  const [openDecimales, setOpenDecimales] = useState(false)

  return (
    <>
      <ButtonGroup variant="contained" color="primary" className="noprint">
        <Tooltip title="Agregar cita" placement="top">
          <Button size="small" onClick={() => setOpenAdd(true)}>
            <Add />
          </Button>
        </Tooltip>
        <Tooltip title="Definir curvas" placement="top">
          <Button size="small" onClick={() => setOpenCurvas(true)}>
            <Gesture />
          </Button>
        </Tooltip>
        <Tooltip title="Decimales" placement="top">
          <Button size="small" onClick={() => setOpenDecimales(true)}>
            <Calculate />
          </Button>
        </Tooltip>
        <Button size="small" onClick={printApp}>
          <Print />
        </Button>
      </ButtonGroup>
      <CitaForm open={openAdd} handleClose={() => setOpenAdd(false)} />
      <CurvaForm open={openCurvas} handleClose={() => setOpenCurvas(false)} />
      <DecimalesForm
        open={openDecimales}
        handleClose={() => setOpenDecimales(false)}
      />
    </>
  )
}
