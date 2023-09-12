import { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  FormControl,
  InputLabel,
  TextField,
  Button,
  Stack,
  Slider,
  Typography,
  MenuItem,
  Select,
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'

import { addTask } from '@store/task.slice'
import { SelectProject } from '@store/project.slice'
import { LanguageContext } from '@contexts/useLanguage'
import useWindowSize from '@hooks/useWindowSize'
import { ProjectContext } from '@contexts/useProject'
import { IProject } from '@interfaces/project.interface'
import { ITask } from '@interfaces/task.interface'
import { emptyProject, emptyTask } from '@utils/emptyObjects'
import { UIContext } from '@contexts/useUI'
import ModalWrapper from '@components/common/modal.wrapper'
import { IMark } from '@interfaces/base.interface'

export default function CreateTaskModal() {
  const dispatch = useDispatch()
  const breakpoint = useWindowSize().breakpoint
  const { translate } = useContext(LanguageContext)
  const { findProject } = useContext(ProjectContext)
  const { closeModal, activeModal, stepList, priorityMarks } = useContext(UIContext)

  const [mark, setMark] = useState<IMark[]>([])
  useEffect(() => {
    const newerMarks = priorityMarks.map((m, mIndex) => {
      return {
        value: mIndex + 1,
        label: translate('common:' + m.toLocaleLowerCase())
      }
    })
    setMark(newerMarks)
  }, [priorityMarks, translate])

  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(activeModal === 'create-task'), [activeModal])

  const [project, setProject] = useState<IProject>(emptyProject)
  const projectCode = useSelector(SelectProject).currentProject
  useEffect(() => {
    const currentProject = projectCode ? findProject(projectCode) : null
    if (currentProject) setProject(currentProject)
  }, [findProject, projectCode])

  const [formData, setFormData] = useState<ITask>({
    ...emptyTask,
    code: project ? project.code + '-' : emptyTask.code,
  })

  const handleClose = () => {
    setFormData({
      ...emptyTask,
      code: project ? project.code + '-' : emptyTask.code,
    })
    closeModal()
  }

  const handleSubmit = () => {
    dispatch(addTask(formData))
    handleClose()
  }

  const handleSlide = (_: Event, value: number | number[]) => {
    const properValue = Array.isArray(value) ? value[0] : value
    setFormData({ ...formData, priority: properValue })
  }

  return (
    <ModalWrapper
      controlState={open}
      closeFn={handleClose}
      title={translate('form:task.createTitle')}
      confirm={
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          {translate('common:Create')}
        </Button>
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
          margin="normal"
          name="task-name"
          label={translate('form:task.nameInput')}
          type="text"
          variant="standard"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <TextField
          autoFocus
          margin="normal"
          name="task-code"
          label={translate('form:task.codeInput')}
          type="text"
          variant="standard"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
        />
        <FormControl sx={{ mt: 1 }}>
          <InputLabel shrink id="task-status-label">
            {translate('form:task.statusInput')}
          </InputLabel>
          <Select
            value={formData.step}
            name="task-status"
            labelId="task-status-label"
            label={translate('form:task.statusInput')}
            onChange={(e: SelectChangeEvent) =>
              setFormData({ ...formData, step: e.target.value })
            }
          >
            {stepList.map((step, stepIndex) => {
              return (
                <MenuItem key={stepIndex} value={step}>{step}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Stack>
      <Stack
        sx={{ mx: 1.5, mt: { xs: 3, sm: 0 } }}
        spacing={2}
        alignItems="center"
        justifyContent="center"
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        <Typography color="text.secondary" gutterBottom>
          {translate('form:task.priorityInput')}
        </Typography>
        <Slider
          valueLabelDisplay="auto"
          name="task-priority"
          step={1}
          marks={breakpoint === 'xs' ? false : mark}
          min={1}
          max={5}
          value={formData.priority}
          onChange={handleSlide}
        />
      </Stack>
      <TextField
        autoFocus
        multiline
        rows={4}
        margin="normal"
        name="task-desc"
        label={translate('form:task.descInput')}
        type="text"
        fullWidth
        variant="standard"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
    </ModalWrapper>
  )
}
