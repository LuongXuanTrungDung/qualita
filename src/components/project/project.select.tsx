import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Divider,
  ListItemIcon,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import BorderColorIcon from '@mui/icons-material/BorderColor'

import {
  selectProject,
  setCurrentProject,
  toggleProjectModal,
} from '@store/project.slice'
import { LanguageContext } from '@contexts/useLanguage'
import { emptyData } from '@utils/constants'

export default function ProjectSelect() {
  const { translate } = useContext(LanguageContext)
  const dispatch = useDispatch()
  const projects = useSelector(selectProject).projectData
  const currentProject = useSelector(selectProject).currentProject

  const [data, setData] = useState(projects)
  const [current, setCurrent] = useState(currentProject)
  const [open, setOpen] = useState(false)

  useEffect(() => setCurrent(currentProject), [currentProject])
  useEffect(() => setData(projects), [projects])

  const handleSelect = (event: SelectChangeEvent) => {
    setOpen(false)
    dispatch(setCurrentProject(event.target.value))
  }

  const handleCreate = () => {
    setOpen(false)
    dispatch(toggleProjectModal('create'))
  }

  const handleEdit = () => {
    setOpen(false)
    dispatch(toggleProjectModal('edit'))
  }

  return (
    <Select
      variant="standard"
      value={currentProject.id}
      name="current-project"
      onChange={handleSelect}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      open={open}
      sx={{ ml: { xs: 1.5, sm: 'auto' } }}
    >
      {data.map((project, pIndex) => (
        <MenuItem
          key={pIndex}
          value={project.id}
          disabled={current === project}
          sx={{ px: 2, py: 1 }}
        >
          {project.name}
        </MenuItem>
      ))}
      <Divider />
      <MenuItem onClick={handleCreate}>
        <ListItemIcon>
          <AddCircleIcon fontSize="small" color="success" />
        </ListItemIcon>
        {translate('form:project.createTitle')}
      </MenuItem>
      {current !== emptyData.project && (
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <BorderColorIcon fontSize="small" color="secondary" />
          </ListItemIcon>
          {translate('form:project.editTitle')}
        </MenuItem>
      )}
    </Select>
  )
}
