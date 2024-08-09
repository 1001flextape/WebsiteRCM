'use client'

import React, { useContext, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { useTheme, styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import SettingsBackButton from '../../components/BackButton/BackButton.component';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';
import RealTimeSwitchRow from '@/components/realtime/SwitchRow/SwitchRow.realtime';
import { SettingFontContext } from './context/SettingFont.context';
import RealTimeSelectRow from '@/components/realtime/SelectRow/SelectRow.realtime';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';


// // function GoogleFontSelector({ fonts, selectedFont, onChange }) {
// //   return (
// //     <>
// //       <HeaderRow label={"Select Google Font"} />
// //       <FormControl fullWidth>
// //         <InputLabel id="font-selector-label">Font</InputLabel>
// //         <Select
// //           labelId="font-selector-label"
// //           id="font-selector"
// //           value={selectedFont}
// //           onChange={onChange}
// //           variant="outlined"
// //         >
// //           {fonts.map((font) => {
// //             const fontInfo = fonts.find((f) => f.family === font.family);
// //             const variants = fontInfo?.variants || [];

// //             console.log('variants', variants)
// //             return (
// //               <div key={font.family}>
// //                 <MenuItem value={font}>
// //                   {font.family} {variants.join(', ')}
// //                 </MenuItem>
// //                 {variants.map((variant) => (
// //                   <MenuItem key={`${font.family}-${variant}`} value={`${font.family}-${variant}`}>
// //                     &nbsp;&nbsp;&nbsp;&nbsp;{variant}
// //                   </MenuItem>
// //                 ))}
// //               </div>
// //             );
// //           })}
// //         </Select>
// //       </FormControl>
// //       <Divider component="li" style={{ borderTopWidth: "5px" }} />
// //     </>
// //   );
// // }

// // function CircleStatus({ isReadyValue, theme }) {
// //   const circleStatusStyle = {
// //     borderRadius: "50px",
// //     height: "15px",
// //     width: "15px",
// //     display: "inline-block",
// //     backgroundColor: isReadyValue ? theme.palette.success.dark : theme.palette.error.dark,
// //   };

//   return (
//     <>
//       <div style={circleStatusStyle}></div>
//       &nbsp;
//       <span>Ready?</span>
//     </>
//   );
// }

function WebsiteSettingsFontSidebar() {
  const theme = useTheme();

  const {
    CircleStatusSuccess,
    CircleStatusDanger,
  } = useContext(AdminLayoutContext)

  const {
    isLoaded, setLoaded,
    entity,
    font, setFont,
    fontValue, setFontValue,
    isReady,
    isReadyValue, setIsReadyValue,
    modals,
    fonts,
    save,
  } = React.useContext(SettingFontContext);

  const [selectedFont, setSelectedFont] = React.useState('');

  // Fetch Google Fonts data from API
  useEffect(() => {
    console.log('fonts made it', fonts, font)
  }, [fonts])

  return (
    <>
      {isLoaded && (
        <>
          <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0, mb: "50px"}}>
            <SettingsBackButton
              label={"Main Menu"}
              href={"/portal/admin/settings/website/settings"}
            />

            <Divider component="li" style={{ borderTopWidth: "12px" }} />

            {/* Fonts selection */}
            <HeaderRow label={"Fonts"} />
            <RealTimeSelectRow
              entity={entity}
              // label={"Fonts"}
              data={font}
              options={fonts}
              // selectedValue={800}
              onChange={(value) => {

                console.log('value', value)
                setFontValue(value)

              }}
            />
            
            <Divider component="li" style={{ borderTopWidth: "5px" }} />


            {/* Status */}
            <HeaderRow label={"Status"} />            
            <RealTimeSwitchRow
              label={(
                <>
                  {isReadyValue
                    ? <CircleStatusSuccess />
                    : <CircleStatusDanger />
                  }
                  &nbsp;
                  <span>Ready?</span>
                </>
              )}
              data={isReady}
              entity={entity}
              onChange={(value) => {
                setIsReadyValue(value)
                console.log('contents to be saved', value)
              }}
            />

            <Divider component="li" style={{ borderTopWidth: "5px" }} />

            <ListItem alignItems="flex-start">
              <ListItemText
                secondary={
                  <React.Fragment>
                    <br />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={save}
                    >
                      Save
                    </Button>
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </>
      )}
    </>
  );
}

export default WebsiteSettingsFontSidebar;
