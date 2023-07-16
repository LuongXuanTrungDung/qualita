import { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Typography, Button } from '@mui/material'
import { removeTask, selectTask, toggleTaskModal } from '@store/task.slice'
import { LanguageContext } from '@contexts/useLanguage'
import DialogWrapper from '@components/common/dialog.wrapper'

export default function DeleteTaskModal() {
  const dispatch = useDispatch()
  const toDeleteTask = useSelector(selectTask).currentTask
  const control = useSelector(selectTask).showDeleteModal
  const [formData, setFormData] = useState(toDeleteTask)
  const { translate } = useContext(LanguageContext)

  useEffect(() => {
    setFormData(toDeleteTask)
  }, [toDeleteTask])

  const handleClose = () => {
    setFormData(toDeleteTask)
    dispatch(toggleTaskModal('delete'))
  }

  const handleSubmit = () => {
    dispatch(removeTask(formData.id))
    handleClose()
  }

  useEffect(() => {
    setFormData(toDeleteTask)
  }, [toDeleteTask])

  return (
    <DialogWrapper
      controlValue={control}
      closeFn={handleClose}
      title={translate('form:task.deleteTitle') + ' ' + toDeleteTask.name}
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
      <input type="hidden" name="task-id" value={formData.id} />
      <Typography>{translate('form:task.deleteConfirm')}</Typography>
    </DialogWrapper>
  )
}
