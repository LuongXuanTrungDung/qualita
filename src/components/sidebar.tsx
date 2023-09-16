import { Drawer, IconButton, Stack, SxProps, Theme, Typography } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useContext, useState } from "react";
import { UIContext } from "@contexts/useUI";
import { LanguageContext } from "@contexts/useLanguage";

export default function Sidebar() {
  const [shown, setShown] = useState(false)
  const { translate } = useContext(LanguageContext)
  const { activeTab, stepList } = useContext(UIContext)

  const drawerWidth = shown ? 120 : 0
  const toggleBtnStyle: SxProps = {
    p: 2, borderRadius: 2, ml: shown ? (drawerWidth / 8) : 0, mr: shown ? 1 : 0,
    my: 'calc(50vh - 2rem)'
  }
  const drawerContentStyle: SxProps = {
    p: 2, minWidth: drawerWidth
  }

  return (
    <aside style={{ width: drawerWidth }}>
      <Drawer component='nav' open={shown} anchor="left" variant="persistent">
        <Stack component='ul' flexDirection='column' sx={drawerContentStyle}>
          {
            activeTab && activeTab != 'settings'
              ? stepList.map((step, stepIndex) => <Typography key={stepIndex}>{step}</Typography>)
              : <Typography>{translate('common:Settings')}</Typography>
          }
        </Stack>
      </Drawer>
      <IconButton sx={toggleBtnStyle} onClick={() => setShown(!shown)}>
        {shown ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </aside>
  )
}