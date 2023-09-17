import { useContext } from "react";
import { Button, ButtonGroup, Divider, MenuItem, Select, SelectChangeEvent, Stack, SxProps, Typography } from "@mui/material";

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DevicesIcon from '@mui/icons-material/Devices';

import { LanguageContext } from "@contexts/useLanguage";
import { ColorModeContext } from "@contexts/useColorMode";
import { SwitchModeType } from "@interfaces/base.interface";

export default function SettingsContent() {
  const fieldStyle: SxProps = {
    pb: 2, pt: 1,
  }

  const { translate, currentLanguage, switchLanguage, allLanguages } = useContext(LanguageContext)
  const handleChange = (event: SelectChangeEvent) => switchLanguage(event.target.value)

  const { switchMode } = useContext(ColorModeContext)
  const renderColorModeBtns = () => {
    const buttons = [
      { icon: <LightModeIcon sx={{ mr: 0.5 }} />, mode: 'light' },
      { icon: <DarkModeIcon sx={{ mr: 0.5 }} />, mode: 'dark' },
      { icon: <DevicesIcon sx={{ mr: 0.5 }} />, mode: null }
    ]
    const btnLabel = (m: SwitchModeType) => m ? 'settings:' +  m : 'common:default'

    return buttons.map((btn, btnIndex) => (
      <Button onClick={() => switchMode(btn.mode as SwitchModeType)} key={btnIndex}>
        {btn.icon}
        <Typography sx={{ ml: 0.5 }}>{translate(btnLabel(btn.mode as SwitchModeType))}</Typography>
      </Button>
    ))
  }

  return (
    <Stack component="section" sx={fieldStyle} flexDirection='column'>
      <Stack flexDirection='row' alignItems='center' sx={fieldStyle}>
        <Typography sx={{ mr: 2 }}>{translate('settings:set_color')}</Typography>
        <ButtonGroup variant="outlined" sx={{ ml: 2 }}>{renderColorModeBtns()}</ButtonGroup>
      </Stack>
      <Divider />
      <Stack flexDirection='row' alignItems='center' sx={{ py: 2 }}>
        <Typography sx={{ mr: 2 }}>{translate('settings:set_lang')}</Typography>
        <Select sx={{ ml: 4 }} value={currentLanguage} onChange={handleChange}>
          {allLanguages.map((l, lIndex) => (
            <MenuItem sx={{ px: 2 }} key={lIndex} value={l.locale}>
              {translate('settings:' + l.locale)}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      <Divider />
    </Stack>
  )
}