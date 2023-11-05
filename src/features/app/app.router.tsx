import { createBrowserRouter } from 'react-router-dom'
import App from '../../App'
import { CitasPage, HomePage, TramosPage } from '../../pages'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        index: true,
        path: '/:carreraId',
        element: <TramosPage />,
      },
      {
        index: true,
        path: '/:carreraId/:tramoId',
        element: <CitasPage />,
      },
    ],
  },
])
