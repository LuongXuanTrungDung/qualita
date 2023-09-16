import { useContext } from "react";

import { LanguageContext } from "@contexts/useLanguage";
import { UIContext } from "@contexts/useUI";

import { Button, Stack, SxProps, Typography } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';


export default function DefaultSpace() {
  const marginValue = 2
  const buttonSpaceHeight = `calc(100vh - ${marginValue * 6.5}rem)`
  const buttonStyles: SxProps = {
    height: buttonSpaceHeight, width: '100%',
    my: marginValue,
    bgcolor: 'action.disabledBackground',
    ":hover": { bgcolor: 'action.selected' }
  }

  const { openModal } = useContext(UIContext)
  const { translate } = useContext(LanguageContext)

  return (
    <Button
      onClick={() => openModal('create-project')}
      sx={buttonStyles}
    >
      <Stack flexDirection='column'>
        <AddCircleIcon sx={{ mx: 'auto', mb: 1 }} color='success' />
        <Typography sx={{ textAlign: 'center', mt: 1 }}>{translate('form:project.createTitle')}</Typography>
      </Stack>
    </Button>
  )
}