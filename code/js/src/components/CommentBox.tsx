import React, {
    useState, useEffect
} from 'react'
import { apiCall, getCookie } from '../utils';
import IconButton from '@mui/material/IconButton';
import Edit from '@material-ui/icons/Edit'
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AddIcon from '@material-ui/icons/Add'
import { Divider, makeStyles, Grid, Paper, Typography } from "@material-ui/core";
import Stack from '@mui/material/Stack';
import CreateCommentDialog from '../components/CreateCommentDialog';
import { getUsername } from '../utils';
import classNames from 'classnames'
import Comment from './Comment';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCommentsAction } from '../actions/commentsActions';


export interface CommentBox {
    projectId: string;
    issueId: string;
    open: any;
    dialogChange: any;
    issueState: string;
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


const CommentBox: React.FC<CommentBox> = ({ projectId, issueId, open, dialogChange, issueState }) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const comments = useSelector((state: any) => state.commentsDetails.comments)
    console.log(comments)

    function onDelete(comment: any) {
        dispatch(deleteCommentsAction(comments.filter((value: any) => value.commentId !== comment)))
    }
    console.log(issueId)
    return (
        <div style={{ padding: 14 }} className="App">
            <Typography variant="h6">
                Comments
            </Typography>

            <Grid>
                <Stack direction="row">
                    <Typography variant="subtitle2" className={classes.topMargin}>
                        Add
                    </Typography>
                    <IconButton
                        onClick={() => dialogChange(true)}
                    >
                        <AddIcon />
                    </IconButton>
                    <CreateCommentDialog
                        projectId={projectId}
                        onClose={() => {
                            dialogChange(false)
                        }}
                        open={open}
                        issueId={issueId}
                    />
                </Stack>
            </Grid>
            <Paper className={classes.commentBoxPaper}>
                {comments && comments.map((comment: any) => {
                    return (
                        <Comment
                            commt={comment}
                            projectId={projectId}
                            issueId={issueId}
                            issueState={issueState}
                            onDelete={(comment: any) => onDelete(comment)}
                        />
                    )
                }
                )}
            </Paper>
        </div>
    );

}


export default CommentBox