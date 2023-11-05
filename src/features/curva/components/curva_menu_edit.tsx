import { Delete, Edit, MoreVert } from '@mui/icons-material'
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from '@mui/material'
import { FC, useId, useState } from 'react'
import { CurvaType, useCurvas } from '..'
import { ConfirmModal } from '../../ui'
import { CurvaFormEdit } from './curva_form_edit'

type Props = {
  curva: CurvaType
}

export const CurvaMenuEdit: FC<Props> = ({ curva }) => {
  const id = useId()
  const { removeCurva } = useCurvas()
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    setOpenEdit(true)
    handleClose()
  }

  const handleDelete = () => {
    removeCurva(curva.id)
  }

  return (
    <div>
      <IconButton
        aria-controls={open ? id : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size="small"
      >
        <MoreVert fontSize="small" />
      </IconButton>
      <Menu
        id={id}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': id,
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuList>
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            <ListItemText>Editar</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpenDelete(true)
              handleClose()
            }}
          >
            <ListItemIcon>
              <Delete fontSize="small" />
            </ListItemIcon>
            <ListItemText>Eliminar</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
      <CurvaFormEdit
        curva={curva}
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
      />
      <ConfirmModal
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        handleConfirm={handleDelete}
        title="¿Eliminar Curva?"
        description="La curva se borrará."
        confirmText="Eliminar"
        cancelText="Volver atrás"
      />
    </div>
  )
}
