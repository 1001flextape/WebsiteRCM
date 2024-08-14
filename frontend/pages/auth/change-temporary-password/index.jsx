'use client'

// libraries
import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

// mine
import { setUserToken } from '@/utils/graphql/user';
import { processGraphQLErrors } from '@/utils/graphql/processGraphQLErrors.func';
import AuthLayout from '@/layouts/authLayout/layout';
import { signInGraphQL } from '@/pages-scripts/auth/signin/signin.graphql';

// MUI
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// icons
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { changeTemporaryPasswordGraphQL } from '@/pages-scripts/auth/change-temporary-password/changeTemporaryPassword.graphql';

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function Page({ searchParams }) {
  const theme = useTheme();
  const router = useRouter();

  const [messageBoxErrorMessage, setMessageBoxErrorMessage] = React.useState("")
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("")
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("")
  const [temporaryPasswordErrorMessage, setTemporaryPasswordErrorMessage] = React.useState("")
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = React.useState("")

  console.log("searchParams", searchParams)

  const handleSubmit = (event) => {
    event.preventDefault();

    setMessageBoxErrorMessage("")
    const data = new FormData(event.currentTarget);
    setEmailErrorMessage("")
    setTemporaryPasswordErrorMessage("")
    setPasswordErrorMessage("")
    setConfirmPasswordErrorMessage("")

    if (data.get('email') === "") {
      setEmailErrorMessage("Email is required")
      return;
    }

    if (data.get('temporary-password') === "") {
      setTemporaryPasswordErrorMessage("Temporary password is required")
      return;
    }

    if (data.get('password') === "") {
      setPasswordErrorMessage("Password is required")
      return;
    }

    if (data.get('confirm-password') === "") {
      setConfirmPasswordErrorMessage("Confirm password is required")
      return;
    }

    changeTemporaryPasswordGraphQL({
      email: data.get('email'),
      temporaryPassword: data.get("temporary-password"),
      password: data.get('password'),
      confirmPassword: data.get('confirm-password')
    }).then(response => {

      const result = processGraphQLErrors({ response })

      if (result.success) {

        console.log('response.data.backendAuth_changeTemporaryPassword.token,', response.data.backendAuth_changeTemporaryPassword.token)
        setUserToken({
          token: response.data.backendAuth_changeTemporaryPassword.token,
        })
        if (!searchParams || isEmpty(searchParams)) {
          router.push("/portal/dashboard/")
        } else {
          router.push(searchParams.url)
        }

        // decodeURIComponent
      } else {
        switch (result.error) {
          case "0000":
            setMessageBoxErrorMessage(result.message)
            break;
          case "0001":
            setMessageBoxErrorMessage(result.message)
            break;
          case "0002":
            setMessageBoxErrorMessage(result.message)
            break;
          case "0003":
            setMessageBoxErrorMessage(result.message)
            break;
          case "0004":
            setMessageBoxErrorMessage(result.message)
            break;
          case "0005":
            setMessageBoxErrorMessage(result.message)
            break;
          case "0006":
            setMessageBoxErrorMessage(result.message)
            break;
          case "0007":
            setMessageBoxErrorMessage(result.message)
            break;
          case "0008":
            setMessageBoxErrorMessage(result.message)
            break;
          case "0009":
            setMessageBoxErrorMessage(result.message)
            break;
          case "0010":
            setMessageBoxErrorMessage(result.message)
            break;
          default:
            setMessageBoxErrorMessage(result.message)
            break;


        }
      }
    })
  };

  return (
    <>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'row',
        }}
      >

      </Box>

      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Temporary Password
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            autoFocus
            error={emailErrorMessage.length}
            helperText={emailErrorMessage}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="temporary-password"
            label="Temporary Password"
            name="temporary-password"
            type="password"
            error={temporaryPasswordErrorMessage.length}
            helperText={temporaryPasswordErrorMessage}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            error={passwordErrorMessage.length}
            helperText={passwordErrorMessage}
          />
          <TextField
            id="confirm-password"
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confirm Password"
            type="password"
            error={confirmPasswordErrorMessage.length}
            helperText={confirmPasswordErrorMessage}

          />

          {messageBoxErrorMessage && (
            <Box sx={{ color: theme.palette.error.main }}>
              {messageBoxErrorMessage}
            </Box>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Change Password
          </Button>
        </Box>
      </Box>
    </>
  )
}

Page.getLayout = function getLayout(page) {
  return (
    <AuthLayout>
      {page}
    </AuthLayout>
  )
}

export default Page