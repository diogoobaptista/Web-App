import React, {
  useState, useEffect
} from 'react'
import { apiCall, getCookie } from '../utils';
import {
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info'
import Callout from '../components/Callout';
import SideBarMenu from '../components/SideBarMenu'
import TextField from '@mui/material/TextField';
import { IButtonsNavBar } from '../components/IButtonsNavBar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useHistory, useParams } from 'react-router';
import CommentBox from '../components/CommentBox';
import Dropdown from '../components/Dropdown'
import IconButton from '@mui/material/IconButton';
import Delete from '@material-ui/icons/Delete'
import { getUsername } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { getIssueAction, editIssueAction, deleteIssueAction } from '../actions/issueActions';
import { getCommentsAction } from '../actions/commentsActions';
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
};

const defaultComments = {
  projectId: '',
  issueId: '',
  comments: Array() as Array<any>,
}

const Issue = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const { id, issueId } = useParams<IdParams>();
  const defaultIssue = useSelector((state: any) => state.issueDetails.issue)
  const [issue, setIssue] = useState(defaultIssue)
  const [issueOriginal, setIssueOriginal] = useState(defaultIssue)
  const [comments, setComments] = useState({ ...defaultComments, projectId: id, issueId: issueId })

  function getComments() {
    apiCall(`http://localhost:9090/api/projects/${id}/issues/${issueId}/comments`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
      mode: 'cors'
    }, false).then(res => {
      return res.json()
    }).then(json => {
      setComments(json)
      dispatch(getCommentsAction(json))
    })
  }

  function getIssue() {
    apiCall(`http://localhost:9090/api/projects/${id}/issues/${issueId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
      mode: 'cors'
    }, false).then(res => {
      if (res.status !== 200) {
        alert('Error Getting Projects')
      }
      return res.json()
    }).then(json => {
      setIssue(json)
      setIssueOriginal(json)
      dispatch(getIssueAction(json))
    })
  }

  const handleSave = () => {
    const body = {
      name: issue.name,
      description: issue.description,
      state: issue.state,
      label: issue.label
    }
    try {
      apiCall(`http://localhost:9090/api/projects/${id}/issues/${issueId}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify(body)
      }, false)
      setIssueOriginal(issue)
      dispatch(editIssueAction(issue))

    } catch (error) {
      alert('Error editing Project')
    }
  }

  const handleDelete = () => {
    try {
      apiCall(`http://localhost:9090/api/projects/${id}/issues/${issueId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
      }, false)
      dispatch(deleteIssueAction(issue))
      history.push(`/project/${id}`)
    } catch (error) {
      alert('Error delete Issue')
    }
  }

  const handleOnChange = (key: String) => (evt: any) => {
    switch (key) {
      case 'name': {
        setIssue({ ...issue, name: evt.target.value })
        break
      }
      case 'description': {
        setIssue({ ...issue, description: evt.target.value })
        break
      }
      case 'state': {
        setIssue({ ...issue, state: evt.target.value })
        break
      }
      case 'label': {
        if (evt.target.value == 'N/A') {
          setIssue({ ...issue, label: null })
          break
        }
        else {
          setIssue({ ...issue, label: evt.target.value })
          break
        }
      }
    }
  }

  function getDynamicButtons() {
    const btns: IButtonsNavBar[] = [{ path: `/project/${id}`, name: `Project - ${id}` }, { path: `project/${id}/issue/${issueId}`, name: `Issue - ${issueId}` }];
    return btns
  }

  useEffect(() => {
    if (!dialogOpen) {
      getIssue();
      getComments();
    }
  }, [dialogOpen]);

  return (
    <div>
      <Grid container spacing={1} direction={'column'}>
        <Stack direction="row">
          <SideBarMenu dynamicButtons={getDynamicButtons()} selected={`project/${id}/issue/${issueId}`} />
          <Grid item md={12} className={classes.layout}>
            <Typography variant="h4">
              Issue Details
            </Typography>
            <Grid container justifyContent="flex-end">
              <Grid item className={classes.buttonDelete}>
                {issue.issueOwner === getUsername() && (
                  <IconButton onClick={() => { handleDelete() }}>
                    <Delete />
                  </IconButton>
                )}
              </Grid>
            </Grid>
            <Grid className={classes.infoSection}>
              <Callout
                message={PageInfo.ISSUE_PAGE}
                icon={<InfoIcon className={classes.infoColor} />}
              />
            </Grid>
            <Grid container spacing={1} direction={'column'} className={classes.layout}>
              <Grid item md={12}>
                <TextField id="standard-basic" label="Issue Owner" variant="standard" value={issue.issueOwner} disabled />
              </Grid>
              <Grid item md={12}>
                <TextField id="standard-basic" label="Issue Id" variant="standard" value={issue.issueId} disabled />
              </Grid>
              <Grid item md={12}>
                <TextField id="standard-basic" label="Created Date" variant="standard" value={issue.createDate} disabled />
              </Grid>
              <Grid item md={12}>
                <TextField
                  id="standard-basic"
                  label="Issue Name"
                  variant="standard"
                  value={issue.name}
                  onChange={handleOnChange('name')}
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  id="standard-basic"
                  label="Issue Description"
                  variant="standard"
                  value={issue.description}
                  onChange={handleOnChange('description')}
                />
              </Grid>
              <Grid item md={12}>
                <Dropdown
                  options={['Open', 'In Progress', 'In Review', 'closed', 'archived']}
                  label='State'
                  value={issue.state}
                  onChange={handleOnChange('state')}
                />
              </Grid>
              <Grid item md={12}>
                <Dropdown
                  options={['N/A', 'defect', 'new-functionality', 'exploration']}
                  label='Label'
                  value={issue.label ? issue.label : 'N/A'}
                  onChange={handleOnChange('label')}
                />
              </Grid>
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" onClick={() => setIssue(issueOriginal)} disabled={issue.name === issueOriginal.name &&
                  issue.description === issueOriginal.description &&
                  issue.state === issueOriginal.state &&
                  issue.label === issueOriginal.label}>
                  Discard
                </Button>
                <Button variant="outlined" onClick={handleSave} disabled={issue.name === issueOriginal.name &&
                  issue.description === issueOriginal.description &&
                  issue.state === issueOriginal.state &&
                  issue.label === issueOriginal.label}>
                  Save
                </Button>
              </Stack>
              <CommentBox
                comments={comments.comments}
                projectId={comments.projectId}
                issueId={comments.issueId}
                open={dialogOpen}
                dialogChange={(value: boolean) => setDialogOpen(value)}
                issueState={issueOriginal.state}
              />
            </Grid>
          </Grid>
        </Stack>
      </Grid>
    </div>
  );
}
export default Issue  