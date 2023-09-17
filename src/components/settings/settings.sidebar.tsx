import { FormEvent, useContext, useRef } from "react";
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import { LanguageContext } from "@contexts/useLanguage";
import { FileContext } from "@contexts/useFile";

export default function SettingsSidebar() {
  const { translate } = useContext(LanguageContext)

  const { importData, exportData } = useContext(FileContext)
  const hiddenInputRef = useRef<HTMLInputElement>(null)
  const handleClick = () => {
    const element = hiddenInputRef.current
    if (element) element.click()
  }
  const handleUpload = async (event: FormEvent<HTMLInputElement>) => {
    await importData(event)
  }

  return (
    <List>
      <ListItem disablePadding><ListItemButton>{translate('settings:ui')}</ListItemButton></ListItem>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton onClick={handleClick}>
          <input
            ref={hiddenInputRef}
            type="file"
            name="import-data"
            hidden
            onChange={(e) => handleUpload(e)}
          />
          <ListItemIcon><FileUploadIcon /></ListItemIcon>
          <ListItemText primary={translate('settings:import')} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={exportData}>
          <ListItemIcon><FileDownloadIcon /></ListItemIcon>
          <ListItemText primary={translate('settings:export')} />
        </ListItemButton>
      </ListItem>
    </List>
  )
}