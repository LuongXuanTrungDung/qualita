import { useContext, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { TextField, Button, Stack } from '@mui/material'

import {
  addProject,
  selectProject,
  toggleProjectModal,
} from '@/store/project.slice'
import { emptyObject } from '@utils/constants'
import { LanguageContext } from '@contexts/useLanguage'
import useWindowSize from '@hooks/useWindowSize'
import DialogWrapper from '@components/common/dialog.wrapper'

export default function CreateProjectModal() {
  const dispatch = useDispatch()
  const control = useSelector(selectProject).showCreateModal
  const breakpoint = useWindowSize().breakpoint
  const [formData, setFormData] = useState(emptyObject.project)
  const { translate } = useContext(LanguageContext)

  const handleClose = () => {
    setFormData(emptyObject.project)
    dispatch(toggleProjectModal('create'))
  }

  const handleSubmit = () => {
    dispatch(addProject(formData))
    handleClose()
  }

  return (
    <DialogWrapper
      controlValue={control}
      closeFn={handleClose}
      title={translate('form:project.createTitle')}
      actions={
        <>
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            {translate('common:Create')}
          </Button>
          <Button onClick={handleClose}>{translate('common:Cancel')}</Button>
        </>
      }
    >
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
