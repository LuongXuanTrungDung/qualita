import { FormEvent, useContext, useRef } from "react";
import { ListItemIcon, MenuItem, Select, SelectChangeEvent, Stack, Switch, Typography, useTheme } from "@mui/material";

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import UploadIcon from '@mui/icons-material/Upload'
import DownloadIcon from '@mui/icons-material/Download'

import { IMenuProps } from "@interfaces/base.interface";
import MenuWrapper from "@components/common/menu.wrapper";
import { LanguageContext } from "@contexts/useLanguage";
import { ColorModeContext } from "@contexts/useColorMode";
import { FileContext } from "@contexts/useFile";

export default function HeaderMenu(props: IMenuProps) {
  const { anchorState } = props
  const [anchor, setAnchor] = anchorState

  // Handle export & import file
  const hiddenInputRef = useRef<HTMLInputElement>(null)
  const { exportData, importData } = useContext(FileContext)
  const uploadData = () => {
    const element = hiddenInputRef.current
    if (element) element.click()
  }
  const handleUploadedFile = async (event: FormEvent<HTMLInputElement>) => {
    if (importData) await importData(event)
  }
  const renderImportBtn = () => {
    return (
      <MenuItem onClick={uploadData} sx={{ py: 1, px: 2 }}>
        <input
          ref={hiddenInputRef}
          type="file"
          name="upload-project"
          hidden
          onChange={(e) => handleUploadedFile(e)}
        />
        <ListItemIcon>
          <UploadIcon />
        </ListItemIcon>
        {translate('common:importData')}
      </MenuItem>
    )
  }
  const renderExportBtn = () => {
    return (
      <MenuItem
        sx={{ py: 1, px: 2 }}
        onClick={() => exportData()}
        color="secondary"
      >
        <ListItemIcon>
          <DownloadIcon />
        </ListItemIcon>
        {translate('common:exportData')}
      </MenuItem>
    )
  }

  // Handle theme & color mode
  const theme = useTheme()
  const { toggleColorMode } = useContext(ColorModeContext)
  const renderColorModeBtn = () => {
    return (
      <Stack flexDirection='row' sx={{ justifyContent: 'center', alignItems: 'center', px: 2, py: 1 }}>
        <Stack flexDirection='row' sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Typography sx={{ mr: 1 }}>{translate('common:lightMode')}</Typography>
          <LightModeIcon />
        </Stack>
        <Switch checked={theme.palette.mode === 'dark'} onChange={toggleColorMode} />
        <Stack flexDirection='row' sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <DarkModeIcon />
          <Typography sx={{ ml: 1 }}>{translate('common:darkMode')}</Typography>
        </Stack>
      </Stack>
    )
  }

  // Handle language & localization
  const { translate, currentLanguage, allLanguages, switchLanguage } = useContext(LanguageContext)
  const handleChange = (event: SelectChangeEvent) => {
    switchLanguage(event.target.value)
  }
  const renderLanguageBtn = () => {
    return (
      <Stack flexDirection='row' sx={{ justifyContent: 'center', alignItems: 'center', px: 2, py: 1 }}>
        <Typography sx={{ mr: 1 }}>{translate('common:setLanguage')}</Typography>
        <Select value={currentLanguage} onChange={handleChange} variant="standard" sx={{ ml: 1 }}>
          {allLanguages.map((l, lIndex) => (
            <MenuItem sx={{ width: '100%', px: 2, py: 1 }} key={lIndex} value={l.locale}>
              {translate('common:' + l.name)}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    )
  }

  return (
    <MenuWrapper anchorState={[anchor, setAnchor]}>
      {renderColorModeBtn()}
      {renderLanguageBtn()}
      {renderExportBtn()}
      {renderImportBtn()}
    </MenuWrapper>
  )
}