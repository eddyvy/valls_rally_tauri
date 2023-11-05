import { Delete, MoveDown, MoveUp, SwapVert } from '@mui/icons-material'
import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material'
import { FC, useId, useState } from 'react'
import { CarreraType } from '../carrera.types'
import { useCarreras } from '..'
import { ConfirmModal } from '../../ui'
import { useAppSelector } from '../../app'

type Props = {
  carrera: CarreraType
}

export const CarreraListItemEdit: FC<Props> = ({ carrera }) => {
  const carreras = useAppSelector((st) => st.carreras.carreras)
  const { editCarrera, removeCarrera, moveCarrera } = useCarreras()
  const [nombre, setNombre] = useState(carrera.nombre)
  const [openDelete, setOpenDelete] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const moveId = useId()

  const openMove = Boolean(anchorEl)

  const handleOpenMoveMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMoveMenu = () => {
    setAnchorEl(null)
  }

  const handleNombreUpdate = () => {
    if (nombre === carrera.nombre) return
    editCarrera(carrera.id, nombre)
  }

  const handleMoveUp = () => {
    if (carreras.length <= carrera.orden) {
      return
    }
    moveCarrera(carrera.id, carrera.orden + 1)
    handleCloseMoveMenu()
  }

  const handleMoveDown = () => {
    if (carrera.orden <= 1) {
      return
    }
    moveCarrera(carrera.id, carrera.orden - 1)
    handleCloseMoveMenu()
  }

  const handleDelete = () => {
    setOpenDelete(false)
    removeCarrera(carrera.id)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '10px 0',
      }}
    >
      <TextField
        size="small"
        fullWidth
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        onBlur={handleNombreUpdate}
      />
      <Box
        sx={{
          display: 'flex',
          gap: '5px',
          margin: '0 5px',
        }}
      >
        <IconButton
          aria-controls={openMove ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openMove ? 'true' : undefined}
          onClick={handleOpenMoveMenu}
        >
          <SwapVert />
        </IconButton>
        <Menu
          id={moveId}
          anchorEl={anchorEl}
          open={openMove}
          onClose={handleCloseMoveMenu}
          MenuListProps={{
            'aria-labelledby': moveId,
          }}
        >
          <MenuItem
            onClick={handleMoveUp}
            disabled={carreras.length <= carrera.orden}
          >
            <ListItemIcon>
              <MoveUp fontSize="small" />
            </ListItemIcon>
            <ListItemText>Mover arriba</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleMoveDown} disabled={carrera.orden <= 1}>
            <ListItemIcon>
              <MoveDown fontSize="small" />
            </ListItemIcon>
            <ListItemText>Mover abajo</ListItemText>
          </MenuItem>
        </Menu>
        <IconButton onClick={() => setOpenDelete(true)}>
          <Delete />
        </IconButton>
        <ConfirmModal
          open={openDelete}
          handleClose={() => setOpenDelete(false)}
          handleConfirm={handleDelete}
          title={`¿Eliminar la carrera "${carrera.nombre}"?`}
          description="Si eliminas la carrera eliminarás también todos sus tramos y todas las citas de estos tramos."
          confirmText="Eliminar"
          cancelText="Volver atrás"
        />
      </Box>
    </Box>
  )
}
