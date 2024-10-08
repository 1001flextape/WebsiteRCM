'use client'
// Libraries
import * as React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

// Mine

// MUI
import { useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PreviewChromeTab from '@/components/previews/ChromeTab/PreviewChromeTab.component';
import { SettingBackgroundColorContext } from './context/SettingBackgroundColor.context';
import DiamondDeviceEmulator from '@/components/previews/DeviceEmulators/DiamondDeviceEmulators';


function PreviewBackgroundColor() {
  const theme = useTheme()
  const router = useRouter()
  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [rows, setRows] = React.useState([]);
  const [isCreateCourseModalOpen, setIsCreateCourseModalOpen] = React.useState(false)

  const {
    isLoaded, setLoaded,
    id, setId,
    entity, setEntity,
    favicon, setFavicon,
    faviconValue, setFaviconValue,
    tab, setTab,
    tabValue, setTabValue,
    isReady, setIsReady,
    isReadyValue, setIsReadyValue,
    modals, setModals,
    isDarkMode, setIsDarkMode,
  } = React.useContext(SettingBackgroundColorContext)


  return (

    <Box sx={{
      flexGrow: 1,
      width: "100%",
      // maxWidth: "900px",
      m: "auto",
      padding: "20px",
      minHeight: "350px",
    }}>
      {isLoaded && (
        // <Paper sx={{
        //   maxWidth: 936,
        //   margin: 'auto',
        //   overflow: 'hidden',
        //   marginBottom: "10px",
        //   p: 3,
        // }}>

        <DiamondDeviceEmulator src={"/portal/previewer/background-color?1=1"} setIsDarkMode={setIsDarkMode} />
        // </Paper>
      )}
    </Box>
  );
}

export default PreviewBackgroundColor
