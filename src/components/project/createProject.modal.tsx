import { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { TextField, Button, Stack } from '@mui/material'

import { addProject, } from '@/store/project.slice'
import { LanguageContext } from '@contexts/useLanguage'
import useWindowSize from '@hooks/useWindowSize'
import ModalWrapper from '@components/common/modal.wrapper'
import { UIContext } from '@contexts/useUI'
import { emptyProject } from '@utils/emptyObjects'

export default function CreateProjectModal() {
  const dispatch = useDispatch()
  const breakpoint = useWindowSize().breakpoint
  const { translate } = useContext(LanguageContext)
  const { activeModal } = useContext(UIContext)

  const [open, setOpen] = useState(activeModal === 'create-project')
  const [formData, setFormData] = useState(emptyProject)

  useEffect(() => setOpen(activeModal === 'create-project'), [activeModal])

  const handleSubmit = () => {
    dispatch(addProject(formData))
    handleClose()
  }

  const handleClose = () => {
    setOpen(false)
    setFormData(emptyProject)
  }

  return (
    <ModalWrapper
      controlState={open}
      closeFn={handleClose}
      title={translate('form:project.createTitle')}
      confirm={
        <Button variant="contained" type="submit" onClick={handleSubmit} sx={{ ml: 'auto' }}>
          {translate('common:Create')}
        </Button>
      }
    >
      <Stack
        direction={breakpoint === 'xs' ? 'column' : 'row'}
        sx={{ pb: 2 }}
      >
        <TextField
          sx={{ mr: 2, width: '100%' }}
          name="project-title"
          label={translate('form:project.nameInput')}
          type="text"
          variant="standard"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <TextField
          sx={{ ml: 2, width: '100%' }}
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
