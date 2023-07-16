import { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Typography, Button } from '@mui/material'

import {
  removeProject,
  selectProject,
  toggleProjectModal,
} from '@/store/project.slice'
import { LanguageContext } from '@contexts/useLanguage'
import DialogWrapper from '@components/common/dialog.wrapper'

export default function DeleteProjectModal() {
  const dispatch = useDispatch()
  const toDeleteProject = useSelector(selectProject).currentProject
  const control = useSelector(selectProject).showDeleteModal
  const [formData, setFormData] = useState(toDeleteProject)
  const { translate } = useContext(LanguageContext)

  useEffect(() => {
    setFormData(toDeleteProject)
  }, [toDeleteProject])

  const handleClose = () => {
    setFormData(toDeleteProject)
    dispatch(toggleProjectModal('delete'))
  }

  const handleSubmit = () => {
    dispatch(removeProject(formData.id))
    handleClose()
  }

  return (
    <DialogWrapper
      controlValue={control}
      closeFn={handleClose}
      title={translate('form:project.deleteTitle') + ' ' + toDeleteProject.name}
      actions={
        <>
          <Button
            variant="contained"
            color="error"
            type="submit"
            onClick={handleSubmit}
          >
            {translate('common:Delete')}
          </Button>
          <Button onClick={handleClose}>{translate('common:Cancel')}</Button>
        </>
      }
    >
      <input type="hidden" name="project-id" value={formData.id} />
      <Typography>{translate('form:project.deleteConfirm')}</Typography>
    </DialogWrapper>
  )
}
