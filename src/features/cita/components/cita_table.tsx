import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { FC } from 'react'
import { useAppSelector } from '../../app'
import { CitaMenuEdit } from './cita_menu_edit'
import { TurnLeft, TurnRight } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(() => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

export const CitaTable: FC = () => {
  const citas = useAppSelector((st) => st.citas)
  const decimals = useAppSelector((st) => st.decimals)

  return (
    <Table sx={{ backgroundColor: (theme) => theme.palette.background.paper }}>
      <TableHead>
        <TableRow>
          <StyledTableCell>#</StyledTableCell>
          <StyledTableCell>Nombre</StyledTableCell>
          <StyledTableCell align="right">Medidos&nbsp;(m)</StyledTableCell>
          <StyledTableCell align="right">Calculados&nbsp;(m)</StyledTableCell>
          <StyledTableCell align="right">Diff&nbsp;(m)</StyledTableCell>
          <StyledTableCell align="right">Curva</StyledTableCell>
          <StyledTableCell align="right" className="noprint"></StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {citas.map((cita, idx) => (
          <StyledTableRow key={cita.id}>
            <StyledTableCell
              sx={{
                fontWeight: 'bold',
                color: (theme) =>
                  cita.esTeorico ? theme.palette.error.main : undefined,
              }}
            >
              {idx + 1}
            </StyledTableCell>
            <StyledTableCell
              sx={{
                color: (theme) =>
                  cita.esTeorico ? theme.palette.error.main : undefined,
              }}
            >
              {cita.nombre}
            </StyledTableCell>
            <StyledTableCell
              align="right"
              sx={{
                color: (theme) =>
                  cita.esTeorico ? theme.palette.error.main : undefined,
              }}
            >
              {cita.metro}
            </StyledTableCell>
            <StyledTableCell
              align="right"
              sx={{
                fontWeight: 'bold',
                color: (theme) =>
                  cita.esTeorico ? theme.palette.error.main : undefined,
              }}
              color="error"
            >
              {cita.metroCalculado === null
                ? '-'
                : cita.metroCalculado.toFixed(decimals)}
            </StyledTableCell>
            <StyledTableCell
              align="right"
              sx={{
                color: (theme) =>
                  cita.esTeorico ? theme.palette.error.main : undefined,
              }}
            >
              {cita.diff === null
                ? '-'
                : cita.diff >= 0
                ? `+${cita.diff.toFixed(decimals)}`
                : cita.diff.toFixed(decimals)}
            </StyledTableCell>
            <StyledTableCell
              align="right"
              sx={{
                color: (theme) =>
                  cita.esTeorico ? theme.palette.error.main : undefined,
              }}
            >
              {cita.curvaData ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '3px',
                  }}
                >
                  <Typography variant="body2">
                    {cita.curvaData.grados} º
                  </Typography>
                  {cita.curvaData.isRight ? (
                    <TurnRight fontSize="small" />
                  ) : (
                    <TurnLeft fontSize="small" />
                  )}
                </Box>
              ) : (
                '-'
              )}
            </StyledTableCell>
            <StyledTableCell align="center" className="noprint">
              <CitaMenuEdit cita={cita} />
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  )
}
