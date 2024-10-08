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
import { SettingFontContext } from './context/SettingFont.context';
import FontPreview from './components/FontPreview';


function PreviewFont() {
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
    fonts,
    font, setFont,
    fontValue, setFontValue,
    isReady, setIsReady,
    isReadyValue, setIsReadyValue,
    modals, setModals,
  } = React.useContext(SettingFontContext)


  return (

    <Box sx={{
      flexGrow: 1,
      width: "100%",
      maxWidth: "900px",
      m: "auto",
      padding: "20px",
      minHeight: "350px",
    }}>
      <br />
      <br />
      {isLoaded && (
        <Paper sx={{
          maxWidth: 936,
          margin: 'auto',
          overflow: 'hidden',
          marginBottom: "10px",
          p: 3,
        }}>
          <FontPreview fontFamily={fontValue} />

          {/* <FontPreview fontFamily="Arial" />
          <FontPreview fontFamily="Courier New" />
          <FontPreview fontFamily="Times New Roman" /> */}
        </Paper>
      )}
    </Box>
  );
}

export default PreviewFont
