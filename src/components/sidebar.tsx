import { Drawer, IconButton, Stack, SxProps, Theme, Typography } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useContext, useState } from "react";
import { UIContext } from "@contexts/useUI";
import SettingsSidebar from "./settings/settings.sidebar";

export default function Sidebar() {
  const [shown, setShown] = useState(false)
  const { activeTab, stepList } = useContext(UIContext)

  const drawerWidth = shown ? 250 : 0
  const toggleBtnStyle: SxProps = {
    p: 2, borderRadius: 2, ml: shown ? (drawerWidth / 8) : 0, mr: shown ? 1 : 0,
    my: 'calc(50vh - 2rem)'
  }
  const drawerContentStyle: SxProps = {
    px: 2, minWidth: drawerWidth
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'settings':
        return <SettingsSidebar />
      case 'default':
        return <></>
      default:
        const steps = stepList.map((step, stepIndex) => <Typography key={stepIndex}>{step}</Typography>)
        return steps
    }
  }

  return (
    <aside style={{ width: drawerWidth }} hidden={activeTab === 'default'}>
      <Drawer component='nav' open={shown} anchor="left" variant="persistent">
        <Stack component='ul' flexDirection='column' sx={drawerContentStyle}>
          {renderContent()}
        </Stack>
      </Drawer>
      <IconButton sx={toggleBtnStyle} onClick={() => setShown(!shown)}>
        {shown ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </aside>
  )
}