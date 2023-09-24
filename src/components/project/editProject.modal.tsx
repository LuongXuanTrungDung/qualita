import { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { TextField, Button, Stack, Box, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import {
  SelectProject,
  editProject,
} from '@/store/project.slice'
import { LanguageContext } from '@contexts/useLanguage'
import useWindowSize from '@hooks/useWindowSize'
import ModalWrapper from '@components/common/modal.wrapper'
import { UIContext } from '@contexts/useUI'
import { emptyProject } from '@utils/emptyObjects'
import { ProjectContext } from '@contexts/useProject'

export default function EditProjectModal() {
  const dispatch = useDispatch()
  const breakpoint = useWindowSize().breakpoint

  const [open, setOpen] = useState(false)
  const { activeModal, closeModal, openModal } = useContext(UIContext)
  useEffect(() => setOpen(activeModal === 'edit-project'), [activeModal])

  const currentProject = useSelector(SelectProject).currentProject
  const { findProject } = useContext(ProjectContext)
  const [formData, setFormData] = useState(emptyProject)
  const { translate } = useContext(LanguageContext)

  useEffect(() => {
    const serializedProject = findProject(currentProject.code)
    setFormData(serializedProject)
  }, [currentProject, findProject])

  const handleClose = () => {
    setFormData(emptyProject)
    closeModal()
  }

  const handleSubmit = () => {
    dispatch(editProject(formData))
    handleClose()
  }

  return (
    <ModalWrapper
      controlState={open}
      closeFn={handleClose}
      title={translate('form:project.editTitle')}
      confirm={
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          {translate('common:Edit')}
        </Button>
      }
    >
      <Stack
        direction={breakpoint === 'xs' ? 'column' : 'row'}
        sx={{ pb: 2 }}
      >
        <TextField
          sx={{ mr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 }, width: '100%' }}
          name="project-title"
          label={translate('form:project.nameInput')}
          type="text"
          variant="standard"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <TextField
          sx={{ ml: { xs: 0, sm: 2 }, mt: { xs: 2, sm: 0 }, width: '100%' }}
          name="project-code"
          label={translate('form:project.codeInput')}
          type="text"
          variant="standard"
          value={formData.code}
          onChange={(e) =>
            setFormData({
              ...formData,
              code: e.target.value,
            })
          }
        />
      </Stack>
      <TextField
        sx={{ pt: 2, width: '100%' }}
        autoFocus
        multiline
        rows={8}
        name="project-desc"
        label={translate('form:project.descInput')}
        type="text"
        variant="standard"
        value={formData.description ? formData.description : ''}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
    </ModalWrapper>
  )
}
