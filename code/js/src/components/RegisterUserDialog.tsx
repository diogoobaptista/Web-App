import React, {
  useState
} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { apiCall, getCookie } from '../utils';



export interface RegisterUserDialogProps {
  open: boolean;
  onClose: () => void;
}

const defaultValue = {
  username: '',
  password: '',
}

const RegisterUserDialog: React.FC<RegisterUserDialogProps> = ({ open, onClose }) => {
  const [value, setValue] = useState(defaultValue)

  const handleSave = () => {
    const endpoint = 'http://localhost:9090/register'
    const body = JSON.stringify(value);
    try {
      apiCall(endpoint, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body,
      }, false).then(res => res.status === 201 ? alert('Success Creating') : alert('Error Creating'))
    } catch (error) {
      alert('error')
    }
    onClose()
  };
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Register User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="username"
            value={value.username}
            onChange={(event) => setValue({ ...value, username: event.target.value })}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="password"
            value={value.password}
            onChange={(event) => setValue({ ...value, password: event.target.value })}
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose()}>Cancel</Button>
          <Button onClick={() => handleSave()}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}


export default RegisterUserDialog