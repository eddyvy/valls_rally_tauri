import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useAutoLoad } from './features/auto_load'
import { Header, Nav } from './features/ui'

function App() {
  useAutoLoad()

  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          paddingBottom: '60px',
        }}
      >
        <Box
          sx={{
            width: '80vw',
            maxWidth: '1000px',
            padding: '20px',
            paddingBottom: '100px',
          }}
        >
          <Nav />
          <Outlet />
        </Box>
      </Box>
    </>
  )
}

export default App
