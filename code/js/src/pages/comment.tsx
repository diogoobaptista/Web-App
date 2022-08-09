import React, {
  useState, useEffect
} from 'react'
import { apiCall, getCookie } from '../utils';
import {
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import SideBarMenu from '../components/SideBarMenu'
import TextField from '@mui/material/TextField';
import { IButtonsNavBar } from '../components/IButtonsNavBar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useHistory, useParams } from 'react-router';
import IconButton from '@mui/material/IconButton';
import Delete from '@material-ui/icons/Delete'
import InfoIcon from '@material-ui/icons/Info'
import Callout from '../components/Callout';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentAction, editCommentAction, deleteCommentAction } from '../actions/commentActions';
import PageInfo from '../enum/PageInfo';

const useStyles = makeStyles(() => ({
  infoColor: {
    color: '#4A4D4E'
  },
  layout: {
    marginLeft: '64px',
    marginTop: '32px'
  },
  infoSection: {
    padding: '16px'
  },
  buttonDelete: {
    marginRight: '64px',
  },
}))


type IdParams = {
  id: string;
  issueId: string;
  commentId: string
};

const Comment = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id, issueId, commentId } = useParams<IdParams>();
  const defaultComment = useSelector((state: any) => state.commentDetail.comment)
  const [comment, setComment] = useState(defaultComment)
  const [commentOriginal, setCommentOriginal] = useState(defaultComment)

  function getComment() {
    apiCall(`http://localhost:9090/api/projects/${id}/issues/${issueId}/comments/${commentId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
    }, false).then(res => {
      if (res.status !== 200) {
        alert('Error Getting Comments')
      }
      return res.json()
    }).then(json => {
      setComment(json)
      setCommentOriginal(json)
      dispatch(getCommentAction(json))
    })
  }
  const handleSave = () => {
    const body = {
      commentId: comment.commentId,
      description: comment.description,
      owner: comment.commentOwner,
      date: comment.date
    }
    try {
      apiCall(`http://localhost:9090/api/projects/${id}/issues/${issueId}/comments/${commentId}`, {
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
    apiCall(`http://localhost:9090/api/projects/${id}/issues/${issueId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
      mode: 'cors'
    }, false)
    dispatch(deleteCommentAction())
    history.push(`/project/${id}/issue/${issueId}`)
  }

  function getDynamicButtons() {
    const btns: IButtonsNavBar[] = [
      { path: `/project/${id}`, name: `Project - ${id}` },
      { path: `/project/${id}/issue/${issueId}`, name: `Issue - ${issueId}` },
      { path: `/project/${id}/issue/${issueId}/comment/${commentId}`, name: `Comment - ${commentId}` }
    ];
    return btns
  }

  useEffect(() => {
    getComment();
  }, []);

  return (
    <div>
      <Grid container spacing={1} direction={'column'}>
        <Stack direction="row">
          <SideBarMenu dynamicButtons={getDynamicButtons()} selected={`/project/${id}/issue/${issueId}/comment/${commentId}`} />
          <Grid item md={12} className={classes.layout}>
            <Typography variant="h4">
              Comment Details
            </Typography>
            <Grid container justifyContent="flex-end">
              <Grid item className={classes.buttonDelete}>
                <IconButton onClick={() => { handleDelete() }}>
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
            <Grid className={classes.infoSection}>
              <Callout
                message={PageInfo.COMMENT_PAGE}
                icon={<InfoIcon className={classes.infoColor} />}
              />
            </Grid>
            <Grid container spacing={1} direction={'column'} className={classes.layout}>
              <Grid item md={12}>
                <TextField id="standard-basic" label="Comment Owner" variant="standard" value={comment.commentOwner} disabled />
              </Grid>
              <Grid item md={12}>
                <TextField id="standard-basic" label="Comment Id" variant="standard" value={comment.commentId} disabled />
              </Grid>
              <Grid item md={12}>
                <TextField id="standard-basic" label="Created Date" variant="standard" value={comment.date} disabled />
              </Grid>
              <Grid item md={12}>
                <TextField
                  id="standard-basic"
                  label="Comment Description"
                  variant="standard"
                  value={comment.description}
                  onChange={(evt) => { setComment({ ...comment, description: evt.target.value }) }}
                />
              </Grid>

              <Stack direction="row" spacing={2}>
                <Button variant="outlined" onClick={() => { setComment(commentOriginal) }} disabled={comment.description === commentOriginal.description}>
                  Discard
                </Button>
                <Button variant="outlined" onClick={handleSave} disabled={comment.description === commentOriginal.description}>
                  Save
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Grid>
    </div>
  );
}
export default Comment  