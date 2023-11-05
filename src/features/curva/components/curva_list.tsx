import { FC } from 'react'
import { useAppSelector } from '../../app'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { CitaListItemText } from '../../cita/components/cita_list_item_text'
import { CitaType } from '../../cita'
import { CurvaType } from '..'
import { TurnLeft, TurnRight } from '@mui/icons-material'
import { CurvaMenuEdit } from './curva_menu_edit'

function getCurvaCitas(c: CurvaType, citas: CitaType[]) {
  let citaIni: CitaType | null = null
  let citaIniIdx: number | null = null

  let citaFin: CitaType | null = null
  let citaFinIdx: number | null = null

  for (let i = 0; i < citas.length; i++) {
    const cita = citas[i]
    if (cita.id === c.citaInicialId) {
      citaIni = cita
      citaIniIdx = i + 1
    }
    if (cita.id === c.citaFinalId) {
      citaFin = cita
      citaFinIdx = i + 1
    }
  }

  return {
    citaIni,
    citaIniIdx,
    citaFin,
    citaFinIdx,
  }
}

export const CurvaList: FC = () => {
  const citas = useAppSelector((st) => st.citas)
  const curvas = useAppSelector((st) => st.curvas)

  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="right">#</TableCell>
          <TableCell align="right">Inicio</TableCell>
          <TableCell align="right">Fin</TableCell>
          <TableCell align="right">Grados</TableCell>
          <TableCell align="right">Dirección</TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {curvas.map((c, idx) => {
          const { citaFin, citaFinIdx, citaIni, citaIniIdx } = getCurvaCitas(
            c,
            citas
          )

          return (
            <TableRow
              key={c.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{idx + 1}</TableCell>
              <TableCell align="right">
                {citaIni && citaIniIdx && (
                  <CitaListItemText cita={citaIni} citaIdx={citaIniIdx} />
                )}
              </TableCell>
              <TableCell align="right">
                {citaFin && citaFinIdx && (
                  <CitaListItemText cita={citaFin} citaIdx={citaFinIdx} />
                )}
              </TableCell>
              <TableCell align="right">{c.grados}</TableCell>
              <TableCell align="right">
                <Box
                  sx={{
                    display: 'flex',
                    gap: '3px',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  {c.isRight ? (
                    <>
                      <TurnRight />
                      <Typography>Derecha</Typography>
                    </>
                  ) : (
                    <>
                      <TurnLeft />
                      <Typography>Izquierda</Typography>
                    </>
                  )}
                </Box>
              </TableCell>
              <TableCell align="right">
                <CurvaMenuEdit curva={c} />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
