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
import { TramoType } from '../tramo.types'
import { useTramos } from '..'
import { ConfirmModal } from '../../ui'
import { useAppSelector } from '../../app'

type Props = {
  tramo: TramoType
}

export const TramoListItemEdit: FC<Props> = ({ tramo }) => {
  const tramos = useAppSelector((st) => st.tramos.tramos)
  const { editTramo, removeTramo, moveTramo } = useTramos()
  const [nombre, setNombre] = useState(tramo.nombre)
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
    if (nombre === tramo.nombre) return
    editTramo(tramo.id, nombre, tramo.factor)
  }

  const handleMoveUp = () => {
    if (tramos.length <= tramo.orden) {
      return
    }
    moveTramo(tramo.id, tramo.orden + 1)
    handleCloseMoveMenu()
  }

  const handleMoveDown = () => {
    if (tramo.orden <= 1) {
      return
    }
    moveTramo(tramo.id, tramo.orden - 1)
    handleCloseMoveMenu()
  }

  const handleDelete = () => {
    setOpenDelete(false)
    removeTramo(tramo.id)
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
            disabled={tramos.length <= tramo.orden}
          >
            <ListItemIcon>
              <MoveUp fontSize="small" />
            </ListItemIcon>
            <ListItemText>Mover arriba</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleMoveDown} disabled={tramo.orden <= 1}>
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
          title={`¿Eliminar el tramo "${tramo.nombre}"?`}
          description="Si eliminas el tramo eliminarás también todas sus citas."
          confirmText="Eliminar"
          cancelText="Volver atrás"
        />
      </Box>
    </Box>
  )
}
