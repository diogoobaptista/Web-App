import React, {
    useState
} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { apiCall, getCookie } from '../utils';
import { useDispatch } from 'react-redux';
import { addCommentAction } from '../actions/commentsActions'

export interface CreateCommentDialog {
    open: boolean;
    onClose: () => void;
    projectId: string;
    issueId: string;
}

const defaultValue = {
    description: '',
}

const CreateCommentDialog: React.FC<CreateCommentDialog> = ({ open, onClose, projectId, issueId }) => {
    const [value, setValue] = useState(defaultValue)
    const dispatch = useDispatch();
    const handleSave = () => {
        const endpoint = `http://localhost:9090/api/projects/${projectId}/issues/${issueId}/comments`
        const body = JSON.stringify(value);
        try {
            apiCall(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                mode: 'cors',
                body,
            }, false)
                .then(res => {
                    if (res.status !== 201) {
                        alert('Error Creating')
                    }
                    return res.json()
                }).then(json => {
                    dispatch(addCommentAction(json))
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
                <DialogTitle>Create Comment</DialogTitle>
                <DialogContent>
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
                    <Button onClick={() => handleSave()} disabled={defaultValue.description === value.description}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}


export default CreateCommentDialog