import { useContext } from "react";
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

import { LanguageContext } from "@contexts/useLanguage";
import { useSelector } from "react-redux";
import { SelectProject } from "@store/project.slice";
import { UIContext } from "@contexts/useUI";

export default function ProjectSidebar() {
  const { translate } = useContext(LanguageContext)
  const { openModal } = useContext(UIContext)
  const currentProject = useSelector(SelectProject).currentProject

  return (
    <List>
      {currentProject.steps.map((step, sIndex) => <ListItem key={sIndex}><ListItemButton>{step}</ListItemButton></ListItem>)}
      <Divider />
      <ListItem>
        <ListItemButton onClick={() => openModal('edit-project')}>
          <ListItemIcon><EditIcon /></ListItemIcon>
          <ListItemText primary={translate('form:project.editTitle')} />
        </ListItemButton>
      </ListItem>
    </List>
  )
}