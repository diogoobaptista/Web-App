import React, {
  useState
} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { addProjectsAction } from '../actions/projectActions'
import DialogTitle from '@mui/material/DialogTitle';
import { apiCall, getCookie } from '../utils';
import { useDispatch } from 'react-redux';



export interface CreateProjectDialog {
  open: boolean;
  onClose: () => void;
}

const defaultValue = {
  name: '',
  description: '',
}

const CreateProjectDialog: React.FC<CreateProjectDialog> = ({ open, onClose }) => {
  const [value, setValue] = useState(defaultValue)
  const dispatch = useDispatch();

  const handleSave = () => {
    const endpoint = 'http://localhost:9090/api/projects'
    const body = JSON.stringify(value);

    try {
      apiCall(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body,
        credentials: 'include',
        mode: 'cors',
      }, false)
        .then(res => {
          if (res.status !== 201) {
            alert('Error Creating')
          }
          return res.json()
        }).then(json => {
          dispatch(addProjectsAction(json))
        })
    } catch (error) {
      alert('error')
    }
    setValue(defaultValue)
    onClose()
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Create Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Project Name"
            value={value.name}
            onChange={(event) => setValue({ ...value, name: event.target.value })}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            value={value.description}
            onChange={(event) => setValue({ ...value, description: event.target.value })}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose()}>Cancel</Button>
          <Button onClick={() => handleSave()} disabled={defaultValue.name === value.name || defaultValue.description === value.description}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}


export default CreateProjectDialog