import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles'

import {
  Menu,
  MenuItem,
  Typography,
  Select,
  SelectChangeEvent,
  Switch,
  MenuList,
  Stack,
} from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload'
import DownloadIcon from '@mui/icons-material/Download'
import ListItemIcon from '@mui/material/ListItemIcon'

import { ColorModeContext } from '@contexts/useColorMode'
import { selectProject } from '@store/project.slice'
import { FileContext } from '@contexts/useFile'
import { definitions, emptyData } from '@utils/constants'
import { LanguageContext } from '@contexts/useLanguage'

interface IMenuProps {
  controlState: [
    HTMLElement | null,
    Dispatch<SetStateAction<HTMLElement | null>>,
  ]
}

export default function SettingsMenu(props: IMenuProps) {
  const currentProject = useSelector(selectProject).currentProject
  const [control, setControl] = props.controlState

  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  const { currentLanguage, translate, switchLanguage } =
    useContext(LanguageContext)
  const { exportData, importData } = useContext(FileContext)

  const [current, setCurrent] = useState(false)
  const hiddenInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setCurrent(currentProject !== emptyData.project)
  }, [currentProject])

  const uploadData = () => {
    setControl(null)
    const element = hiddenInputRef.current
    if (element) {
      element.click()
    }
  }

  const downloadData = () => {
    setControl(null)
    exportData()
  }

  const handleUploadedFile = async (event: FormEvent<HTMLInputElement>) => {
    if (importData) await importData(event)
  }

  const handleChange = (event: SelectChangeEvent) => {
    switchLanguage(event.target.value)
  }

  return (
    <Menu
      open={Boolean(control)}
      anchorEl={control}
      onClose={() => setControl(null)}
    >
      <MenuList sx={{ px: '1.25rem', py: 1 }}>
        <MenuItem onClick={colorMode.toggleColorMode}>
          <Typography>
            {theme.palette.mode === 'dark'
              ? translate('common:darkMode')
              : translate('common:lightMode')}
          </Typography>
          <Switch checked={theme.palette.mode === 'dark'} />
        </MenuItem>
        <Stack flexDirection="row" sx={{ py: 1 }}>
          <Typography sx={{ my: 'auto', mx: 2 }}>
            {translate('common:setLanguage')}
          </Typography>
          <Select value={currentLanguage()} onChange={handleChange}>
            {definitions.languages.map((l, lIndex) => (
              <MenuItem sx={{ px: 2 }} key={lIndex} value={l.locale}>
                {translate('common:' + l.name)}
              </MenuItem>
            ))}
          </Select>
        </Stack>
        {current && (
          <MenuItem
            sx={{ py: 1, px: 2 }}
            onClick={downloadData}
            color="secondary"
          >
            <ListItemIcon>
              <DownloadIcon />
            </ListItemIcon>
            {translate('common:exportData')}
          </MenuItem>
        )}
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
      </MenuList>
    </Menu>
  )
}
