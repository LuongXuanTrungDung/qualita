import { Button, Drawer, IconButton, Stack, SxProps } from "@mui/material";
import { useState } from "react";

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export default function Settings() {
  const [open, setOpen] = useState(false);

  const drawerStyle: SxProps = {
    width: 250, flexShrink: 0,
    marginRight: 1,
    '& .MuiDrawer-paper': {
      width: 250,
      boxSizing: 'border-box',
    },
  }
  const drawerContentStyle = {
    padding: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }

  return (
    <Stack component='section' flexDirection='row'>
      <article style={{ marginLeft: 1 }}>
        <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      </article>
      <Drawer component='aside' sx={drawerStyle} variant="persistent" anchor="left" open={open}>
        <div style={drawerContentStyle}>
          <IconButton onClick={() => setOpen(false)}><ChevronLeftIcon /></IconButton>
        </div>
      </Drawer>
    </Stack>
  )
}