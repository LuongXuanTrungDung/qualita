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
import { SelectProject, addTask_intoProject } from '@store/project.slice'
import { LanguageContext } from '@contexts/useLanguage'
import useWindowSize from '@hooks/useWindowSize'
import { ITask } from '@interfaces/task.interface'
import { emptyTask } from '@utils/emptyObjects'
import { UIContext } from '@contexts/useUI'
import ModalWrapper from '@components/common/modal.wrapper'
import { IMark } from '@interfaces/base.interface'

export default function CreateTaskModal() {
  const dispatch = useDispatch()
  const breakpoint = useWindowSize().breakpoint
  const { translate } = useContext(LanguageContext)
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

  const project = useSelector(SelectProject).currentProject
  const [formData, setFormData] = useState<ITask>({
    ...emptyTask,
    code: project ? project + '-' : emptyTask.code,
  })
  useEffect(() => {
    setFormData({ ...formData, code: project.code + '-' + String(project.tasks.length + 1) })
  }, [formData, project])

  const handleClose = () => {
    setFormData(emptyTask)
    closeModal()
  }

  const handleSubmit = () => {
    dispatch(addTask(formData))
    dispatch(addTask_intoProject(formData))
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
        direction={breakpoint === 'xs' ? 'column' : 'row'}
        sx={{ pb: 2 }}
      >
        <TextField
          sx={{ mr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 }, width: '100%' }}
          name="task-name"
          label={translate('form:task.nameInput')}
          type="text"
          variant="standard"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <TextField
          sx={{ mx: { xs: 0, sm: 2 }, my: { xs: 2, sm: 0 }, width: '100%' }}
          name="task-code"
          label={translate('form:task.codeInput')}
          type="text"
          variant="standard"
          value={formData.code}
          disabled
        />
        <FormControl sx={{ ml: { xs: 0, sm: 2 }, mt: { xs: 2, sm: 0 }, width: '100%' }}>
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
        sx={{ mx: 4, py: 4 }}
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
        sx={{ pt: 2, width: '100%' }}
        multiline
        rows={6}
        name="task-desc"
        label={translate('form:task.descInput')}
        type="text"
        variant="standard"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
    </ModalWrapper>
  )
}
