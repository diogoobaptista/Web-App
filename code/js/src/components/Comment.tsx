import React, {
    useState
} from 'react'
import { apiCall } from '../utils';
import IconButton from '@mui/material/IconButton';
import Delete from '@material-ui/icons/Delete'
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Divider, makeStyles, Grid } from "@material-ui/core";
import Stack from '@mui/material/Stack';
import { getUsername } from '../utils';
import { useDispatch } from 'react-redux';
import { editCommentAction } from '../actions/commentActions';

import classNames from 'classnames'


export interface Comment {
    commt: any;
    projectId: string;
    issueId: string;
    issueState: string;
    onDelete: (comment: any) => void;
}

const useStyles = makeStyles(() => ({
    color: {
        backgroundColor: '#d1cfcf'
    },
    buttonEdit: {
        marginRight: '64px',
    },
    topMargin: {
        marginTop: '8px'
    },
    commentBoxTextAlign: {
        textAlign: "left"
    },
    commentBoxTMargin: {
        margin: 0
    },
    commentBoxColor: {
        color: "gray"
    },
    dividerMargin: {
        margin: "30px 0"
    },
    commentBoxPaper: {
        padding: "40px 20px"
    }
}))


const Comment: React.FC<Comment> = ({ commt, projectId, issueId, issueState, onDelete }) => {
    const classes = useStyles();
    const history = useHistory();
    const [comment, setComment] = useState(commt)
    const dispatch = useDispatch();
    const [commentOriginal, setCommentOriginal] = useState(commt)


    const handleSave = () => {
        const body = {
            commentId: comment.commentId,
            description: comment.description,
            owner: comment.commentOwner,
            date: comment.date
        }
        try {
            apiCall(`http://localhost:9090/api/projects/${projectId}/issues/${issueId}/comments/${comment.commentId}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                },
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify(body)
            }, false)
            setCommentOriginal(comment)
            dispatch(editCommentAction(comment))
        } catch (error) {
            alert('Error editing Comment')
        }
    }

    const handleDelete = () => {
        apiCall(`http://localhost:9090/api/projects/${projectId}/issues/${issueId}/comments/${comment.commentId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
            },
            credentials: 'include',
            mode: 'cors'
        }, false)
        onDelete(comment.commentId)
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs zeroMinWidth>
                    <h4 className={classNames(classes.commentBoxTMargin, classes.commentBoxTextAlign)}>{comment.commentOwner}</h4>
                    <Grid container justifyContent="flex-end">
                        <Grid item className={classes.buttonEdit}>
                            {comment.commentOwner === getUsername() && issueState !== 'archived' && (
                                <IconButton onClick={() => { handleDelete() }}>
                                    <Delete />
                                </IconButton>
                            )}
                        </Grid>
                    </Grid>
                    <Grid item md={12}>
                        <TextField
                            id="standard-basic"
                            variant="standard"
                            disabled={comment.commentOwner !== getUsername() && issueState !== 'archived'}
                            value={comment.description}
                            onChange={(evt: { target: { value: any; }; }) => { setComment({ ...comment, description: evt.target.value }) }}
                        />
                    </Grid>
                    {comment.commentOwner === getUsername() && issueState !== 'archived' && (
                        <Stack direction="row" spacing={2}>
                            <Button variant="outlined" onClick={() => { setComment(commentOriginal) }} disabled={comment.description === commentOriginal.description}>
                                Discard
                            </Button>
                            <Button variant="outlined" onClick={handleSave} disabled={comment.description === commentOriginal.description}>
                                Save
                            </Button>
                        </Stack>
                    )}
                    <p className={classNames(classes.commentBoxColor, classes.commentBoxTextAlign)}>
                        {comment.date}
                    </p>
                </Grid>
            </Grid>
            <Divider variant="fullWidth" className={classes.dividerMargin} />
        </div>
    );

}


export default Comment;