import { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  FormControl,
  IconButton,
  Box,
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
import DeleteIcon from '@mui/icons-material/Delete'

import { definitions } from '@utils/constants'
import { editTask, selectTask, toggleTaskModal } from '@store/task.slice'
import { LanguageContext } from '@contexts/useLanguage'
import useWindowSize from '@hooks/useWindowSize'
import DialogWrapper from '@components/common/dialog.wrapper'

export default function EditTaskModal() {
  const dispatch = useDispatch()
  const marks = definitions.priorityMarks
  const taskCols = definitions.kanbanColumns
  const breakpoint = useWindowSize().breakpoint
  const currentTask = useSelector(selectTask).currentTask
  const control = useSelector(selectTask).showEditModal
  const [formData, setFormData] = useState(currentTask)
  const { translate } = useContext(LanguageContext)

  const handleClose = () => {
    setFormData(currentTask)
    dispatch(toggleTaskModal('edit'))
  }

  const handleSubmit = () => {
    dispatch(editTask(formData))
    handleClose()
  }

  const handleSlide = (_: Event, value: number | number[]) => {
    const properValue = Array.isArray(value) ? value[0] : value
    setFormData({ ...formData, priority: properValue })
  }

  useEffect(() => {
    setFormData(currentTask)
  }, [currentTask])

  const renderActions = (
    <>
      <IconButton
        sx={{ marginRight: 'auto' }}
        color="error"
        onClick={() => dispatch(toggleTaskModal('delete'))}
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
      title={translate('form:task.editTitle') + ' ' + currentTask.name}
      actions={renderActions}
    >
      <input type="hidden" name="current-project" value={currentTask.project} />
      <input type="hidden" name="current-task" value={currentTask.id} />
      <Stack
        spacing={2}
        alignItems="center"
        justifyContent="center"
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        <TextField
          autoFocus
          margin="dense"
          name="task-name"
          label={translate('form:task.nameInput')}
          type="text"
          variant="standard"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <TextField
          autoFocus
          margin="dense"
          name="task-code"
          label={translate('form:task.codeInput')}
          type="text"
          variant="standard"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
        />
        <FormControl sx={{ mt: 1 }}>
          <InputLabel id="task-status-label" shrink>
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
        <Typography gutterBottom>
          {translate('form:task.priorityInput')}
        </Typography>
        <Slider
          name="task-priority"
          value={formData.priority}
          valueLabelDisplay="auto"
          step={1}
          marks={breakpoint === 'xs' ? false : marks}
          min={1}
          max={5}
          onChange={handleSlide}
        />
      </Stack>
      <TextField
        autoFocus
        multiline
        rows={4}
        margin="dense"
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
