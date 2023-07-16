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

import { definitions, emptyObject } from '@utils/constants'
import { addTask, selectTask, toggleTaskModal } from '@store/task.slice'
import { selectProject } from '@store/project.slice'
import { LanguageContext } from '@contexts/useLanguage'
import useWindowSize from '@hooks/useWindowSize'
import DialogWrapper from '@components/common/dialog.wrapper'

export default function CreateTaskModal() {
  const dispatch = useDispatch()
  const breakpoint = useWindowSize().breakpoint
  const marks = definitions.priorityMarks
  const taskCols = definitions.kanbanColumns
  const currentProject = useSelector(selectProject).currentProject
  const control = useSelector(selectTask).showCreateModal
  const { translate } = useContext(LanguageContext)

  const [project, setProject] = useState(currentProject)
  const [formData, setFormData] = useState({
    ...emptyObject.task,
    code: project.code + '-',
    project: project.id,
  })

  const handleClose = () => {
    setFormData({
      ...emptyObject.task,
      code: project.code + '-',
      project: project.id,
    })
    dispatch(toggleTaskModal('create'))
  }

  const handleSubmit = () => {
    dispatch(addTask(formData))
    handleClose()
  }

  const handleSlide = (_: Event, value: number | number[]) => {
    const properValue = Array.isArray(value) ? value[0] : value
    setFormData({ ...formData, priority: properValue })
  }

  useEffect(() => {
    setProject(currentProject)
  }, [currentProject])

  return (
    <DialogWrapper
      controlValue={control}
      closeFn={handleClose}
      title={translate('form:task.createTitle')}
      actions={
        <>
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            {translate('common:Create')}
          </Button>
          <Button onClick={handleClose}>{translate('common:Cancel')}</Button>
        </>
      }
    >
      <input type="hidden" name="current-project" value={project.id} />
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
            value={formData.status}
            name="task-status"
            labelId="task-status-label"
            label={translate('form:task.statusInput')}
            onChange={(e: SelectChangeEvent) =>
              setFormData({ ...formData, status: e.target.value })
            }
          >
            {taskCols.map((col, colIndex) => {
              return (
                <MenuItem key={colIndex} value={col}>
                  {translate(col)}
                </MenuItem>
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
          marks={breakpoint === 'xs' ? false : marks}
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
    </DialogWrapper>
  )
}
