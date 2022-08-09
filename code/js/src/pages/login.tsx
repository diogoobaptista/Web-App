import React, {
  useState, useEffect
} from 'react'
import {
  Grid,
  TextField,
  Paper,
  Typography,
} from '@material-ui/core';
import Button from '@mui/material/Button';
import { apiCall, setCookie, setUsername } from '../utils'
import { useHistory } from 'react-router';
import RegisterUserDialog from '../components/RegisterUserDialog';

const defaultValue = {
  username: '',
  password: '',
}

const Login = () => {
  const [value, setValue] = useState(defaultValue)
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const history = useHistory()


  const handleChange = (key: String) => (evt: any) => {
    switch (key) {
      case 'username': {
        setValue({ ...value, username: evt.target.value })
        break
      }
      case 'password': {
        setValue({ ...value, password: evt.target.value })
        break
      }
    }
  }

  function performeLogin() {
    try {
      apiCall(`http://localhost:9090/login`, {
        method: 'POST',
        headers: {
          'username': value.username,
          'password': value.password,
          'content-type': 'application/json',
        }
      }, false).then(res => {
        return res.json()
      }).then(json => {
        setCookie('Bearer', json.bearer)
        setUsername(value.username)
        sessionStorage.setItem('logged', 'true')
        history.push('/home')
      })
    } catch (error) {
      alert('Invalid User')
    }
  }

  const handleClickOpen = (key: String) => (evt: any) => {
    switch (key) {
      case 'signIn': {
        performeLogin();
        break
      }
      case 'register': {
        setDialogOpen(true);
        break
      }
    }
  }

  useEffect(() => {
    setValue(value)
  }, [value])

  return (
    <div style={{ padding: 30 }}>
      <Paper>
        <Grid
          container
          spacing={3}
          direction={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Grid item xs={8}>
            <Typography variant="h4">
              Login
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField label="Username" value={value.username} onChange={handleChange('username')}></TextField>
          </Grid>
          <Grid item xs={8}>
            <TextField label="Password" type={'password'} value={value.password} onChange={handleChange('password')}></TextField>
          </Grid>
          <Grid item xs={8}>
            <Button variant="contained" onClick={handleClickOpen('signIn')} disabled={value.username === '' && value.password === ''}>
              Sign In
            </Button>
          </Grid>
          <Grid item xs={8}>
            <Button variant="contained" onClick={handleClickOpen('register')}>
              Register
            </Button>
          </Grid>
          <RegisterUserDialog
            onClose={() => { setDialogOpen(false) }}
            open={dialogOpen}
          />
        </Grid>
      </Paper>
    </div>
  )
}

export default Login