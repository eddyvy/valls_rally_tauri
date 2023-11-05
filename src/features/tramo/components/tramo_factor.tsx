import { Box, Button, Link, TextField } from '@mui/material'
import { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app'
import { tramosActions, useTramos } from '..'
import { ErrorSnack } from '../../ui'
import { useCitas } from '../../cita'

export const TramoFactor: FC = () => {
  const dispatch = useAppDispatch()
  const tramo = useAppSelector((st) => st.tramos.selected)
  const { editTramo } = useTramos()
  const { readCitas } = useCitas()

  const [showFactor, setShowFactor] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [factor, setFactor] = useState<string>(
    tramo ? tramo.factor.toFixed(2) : ''
  )

  const handleEdit = () => {
    const numFactor = Number(factor)

    if (isNaN(numFactor)) {
      setError('El factor debe ser numérico')
      return
    }

    if (!tramo || numFactor === tramo.factor) return
    editTramo(tramo.id, tramo.nombre, numFactor).then(() => {
      readCitas()
      dispatch(tramosActions.select(tramo.id))
    })

    setShowFactor(false)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Link
        underline="hover"
        color="inherit"
        sx={{ cursor: 'pointer' }}
        onClick={() => setShowFactor((f) => !f)}
      >
        Factor K = {tramo?.factor}
      </Link>
      {showFactor && (
        <Box sx={{ display: 'flex', gap: '5px' }}>
          <TextField
            size="small"
            sx={{ width: 100 }}
            value={factor}
            onChange={(e) => {
              setFactor(e.target.value)
            }}
          />
          <Button size="small" onClick={handleEdit}>
            OK
          </Button>
        </Box>
      )}
      <ErrorSnack error={error} setError={setError} />
    </Box>
  )
}
