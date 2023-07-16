import { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { TextField, Button, Stack, Box, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import {
  editProject,
  selectProject,
  toggleProjectModal,
} from '@/store/project.slice'
import { LanguageContext } from '@contexts/useLanguage'
import useWindowSize from '@hooks/useWindowSize'
import DialogWrapper from '@components/common/dialog.wrapper'

export default function EditProjectModal() {
  const dispatch = useDispatch()
  const control = useSelector(selectProject).showEditModal
  const toEditProject = useSelector(selectProject).currentProject
  const breakpoint = useWindowSize().breakpoint
  const [formData, setFormData] = useState(toEditProject)
  const { translate } = useContext(LanguageContext)

  useEffect(() => {
    setFormData(toEditProject)
  }, [toEditProject])

  const handleClose = () => {
    setFormData(toEditProject)
    dispatch(toggleProjectModal('edit'))
  }

  const handleSubmit = () => {
    dispatch(editProject(formData))
    handleClose()
  }

  const renderActions = (
    <>
      <IconButton
        sx={{ marginRight: 'auto' }}
        color="error"
        onClick={() => dispatch(toggleProjectModal('delete'))}
      >
        <DeleteIcon />
      </IconButton>
      <Box sx={{ marginLeft: 'auto' }}>
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          {translate('common:Edit')}
        </Button>
        <Button onClick={handleClose}>{translate('common:Cancel')}</Button>
      </Box>
    </>
  )

  return (
    <DialogWrapper
      controlValue={control}
      closeFn={handleClose}
      title={translate('form:project.editTitle') + ' ' + toEditProject.name}
      actions={renderActions}
    >
      <input type="hidden" name="project-title" value={formData.id} />
      <Stack
        spacing={2}
        useFlexGap
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        direction={breakpoint === 'xs' ? 'column' : 'row'}
      >
        <TextField
          autoFocus
          margin="dense"
          name="project-title"
          label={translate('form:project.nameInput')}
          type="text"
          variant="standard"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <TextField
          autoFocus
          margin="dense"
          name="project-code"
          label={translate('form:project.codeInput')}
          type="text"
          variant="standard"
          value={formData.code}
          onChange={(e) =>
            setFormData({
              ...formData,
              code: e.target.value.toLocaleUpperCase(),
            })
          }
        />
      </Stack>
      <TextField
        autoFocus
        multiline
        rows={4}
        margin="dense"
        name="project-desc"
        label={translate('form:project.descInput')}
        type="text"
        fullWidth
        variant="standard"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
    </DialogWrapper>
  )
}
