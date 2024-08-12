import React, { useState, useEffect, useContext } from 'react';
import ListItem from '@mui/material/ListItem';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import UserChip from '@/components/chip/user.chip';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { initSocket } from '@/utils/realtime/socket';

function RealTimeSelectRow({ id, entity, label, data, options, onChange, onChangeByUser }) {


  const { idChip, applySwitchBuffer } = useContext(AdminLayoutContext)
  // applyTextFieldSelectionBuffer
  const [orderNumber, setOrderNumber] = useState(0)

  const [selectionValue, setSelectionValue] = useState("");

  const [user, setUser] = useState()

  const applyOrder = ({ order }) => {
    if (order > orderNumber) {
      setOrderNumber(order)
    }
  }

  useEffect(() => {
    if (onChange && selectionValue) {
      console.log('chaning!', selectionValue)
      onChange(selectionValue)
    }
  }, [selectionValue])


  useEffect(() => {
    setSelectionValue(data?.value);

  }, []);

  // const handleChange = (event) => {
  //   const newValue = event.target.value;
  //   setSelectionValue(newValue);
  //   if (onChange) {
  //     onChange(newValue);
  //   }
  // };

  const handleChange = event => {
    const newValue = event.target.value;

    console.log('value being inserted', newValue)
    setSelectionValue(newValue)
    setUser(idChip)

    const socket = initSocket();

    console.log('server-samedoc-select-change', {
      entity,
      name: data.name,
      value: newValue,
    })
    socket.emit('server-samedoc-select-change', {
      entity,
      name: data.name,
      value: newValue,
    })

    if (onChangeByUser) {
      onChangeByUser(newValue)
    }
  }

  useEffect(() => {
    if (data?.order) {
      applyOrder({
        order: data.order
      })
    }

    // if (data?.booleanValue === true || data?.booleanValue === false) {
    //   setSwitchValue(data.booleanValue)


    // }

    if (data?.user) {
      setUser(data.user)
    }

    const socket = initSocket()

    if (data) {
      socket.on("samedoc-select-change", result => {
        console.log('"samedoc-select-change"', result, entity, data)

        if (result?.entity === entity && result?.name === data.name) {
          if (result?.user) {
            setUser(result.user)
          }

          if (result?.value) {
            setSelectionValue(result.value)
          }

          if (result?.order) {
            applyOrder(result.order)
          }

        }
      })
    }
    //   applySwitchBuffer({
    //     entity,
    //     name: data.name,
    //     order: orderNumber,
    //     cb: (result) => {
    //       console.log('ran once!!!!!!!!!!!!!!!!! test good!!!!!!!', result)
    //       if (result?.user) {
    //         setUser(result.user)
    //       }

    //       if (result?.booleanValue === true || result?.booleanValue === false) {
    //         setSwitchValue(result.booleanValue)
    //         if (onChange) {
    //           onChange(result.booleanValue)
    //         }
    //       }

    //       if (result?.order) {
    //         applyOrder(result.order)
    //       }

    //     }
    //   }).then((highestOrderNumber) => {
    //     console.log('highestOrderNumber', highestOrderNumber)
    //     socket.on("samedoc-switch-change", result => {

    //       if (result?.entity === entity && result?.name === data.name) {
    //         if (result?.user) {
    //           setUser(result.user)
    //         }

    //         if (result?.booleanValue === true || result?.booleanValue === false) {
    //           setSwitchValue(result.booleanValue)
    //           if (onChange) {
    //             onChange(result.booleanValue)
    //           }
    //         }

    //         if (result?.order) {
    //           applyOrder(result.order)
    //         }

    //       }
    //     })
    //   })
    // }

    return () => {
      socket.off("samedoc-select-change")
    }
  }, [])
  // samedoc-select-change

  return (
    <ListItem>
      <Box display="flex" flexDirection="column" alignItems="flex-start" width="100%">

        {/* Label Component */}
        <Typography variant="subtitle1" gutterBottom>
          {label}
        </Typography>

        {/* Select Component */}
        <Select
          value={selectionValue}
          onChange={handleChange}
          style={{ width: '100%' }}
        >
          {options.map((option) => (
            <MenuItem key={option.key} value={option.key}>
              {option.value}
            </MenuItem>
          ))}
        </Select>

        {/* Chip Component */}
        <Box mt={1} display="flex" justifyContent="flex-end" width="100%"
          sx={{ minHeight: "34px" }}
        >
          {user && <UserChip
            picturePreview={user.picture}
            circleColor={user.circleColor}
            labelColor={user.labelColor}
            callByType={user.callByType}
            email={user.email}
            firstName={user.firstName}
            lastName={user.lastName}
            username={user.username}
            displayName={user.displayName}
          />}
        </Box>

      </Box>
    </ListItem>
  );
}

export default RealTimeSelectRow;
