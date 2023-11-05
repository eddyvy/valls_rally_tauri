import { Alert, Snackbar } from '@mui/material'
import { FC } from 'react'

type Props = {
  error: string | null
  setError: (error: string | null) => void
}

export const ErrorSnack: FC<Props> = ({ error, setError }) => {
  const handleClose = () => setError(null)

  return (
    <Snackbar
      open={error !== null}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  )
}
