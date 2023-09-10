import { useContext } from 'react'
import { Link, Stack, Typography } from '@mui/material'
import { LanguageContext } from '@contexts/useLanguage'

export default function Footer() {
  const { translate } = useContext(LanguageContext)
  const currentYear = new Date().getFullYear()

  return (
    <Stack
      component="footer"
      sx={{ pt: 2 }}
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
    >
      <Typography sx={{ mr: 1 }}>{translate('common:copyright')}</Typography>
      <Link href="https://github.com/LuongXuanTrungDung">
        {translate('common:authorName')}
      </Link>
      <Typography sx={{ ml: 1 }}>@ {currentYear}</Typography>
    </Stack>
  )
}
