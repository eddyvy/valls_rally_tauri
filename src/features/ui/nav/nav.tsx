import { Breadcrumbs, Link, Typography } from '@mui/material'
import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../app'

export const Nav: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const carreraSelected = useAppSelector((st) => st.carreras.selected)
  const tramoSelected = useAppSelector((st) => st.tramos.selected)

  const routes = [
    { label: 'Carreras', path: '/' },
    ...(carreraSelected && location.pathname !== '/'
      ? [{ label: carreraSelected.nombre, path: `/${carreraSelected.id}` }]
      : []),
    ...(carreraSelected &&
    tramoSelected &&
    location.pathname === `/${carreraSelected.id}/${tramoSelected.id}`
      ? [
          {
            label: tramoSelected.nombre,
            path: `/${carreraSelected.id}/${tramoSelected.id}`,
          },
        ]
      : []),
  ]

  return (
    <Breadcrumbs sx={{ marginBottom: '15px' }}>
      {routes.map((r, idx) =>
        idx === routes.length - 1 && idx !== 0 ? (
          <Typography key={idx} color="text.primary">
            {r.label}
          </Typography>
        ) : (
          <Link
            key={idx}
            underline="hover"
            color="inherit"
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate(r.path)}
          >
            {r.label}
          </Link>
        )
      )}
    </Breadcrumbs>
  )
}
