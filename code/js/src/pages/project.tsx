import React, {
  useState, useEffect
} from 'react'
import { apiCall, getCookie, getUsername } from '../utils';
import {
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import InfoIcon from '@material-ui/icons/Info'
import IconButton from '@mui/material/IconButton';
import Callout from '../components/Callout';
import Button from '@mui/material/Button';
import AddIssue from '@material-ui/icons/Add'
import Stack from '@mui/material/Stack';
import CreateIssueDialog from '../components/CreateIssueDialog';
import { getProjectAction, editProjectAction } from '../actions/projectActions';
import { useParams } from 'react-router';
import SideBarMenu from '../components/SideBarMenu'
import { IButtonsNavBar } from '../components/IButtonsNavBar';
import { useDispatch, useSelector } from 'react-redux';
import PageInfo from '../enum/PageInfo';

type IdParams = {
  id: string;
};

const useStyles = makeStyles(() => ({
  infoColor: {
    color: '#4A4D4E'
  },
  infoSection: {
    padding: '16px'
  },
  layout: {
    marginLeft: '64px',
    marginTop: '32px'
  },
  topMargin: {
    marginTop: '8px'
  },
}))

const defaultProject = {
  projectOwner: '',
  projectId: '',
  name: '',
  description: '',
  issuesIds: Array() as Array<Number>,
}

const Project = () => {
  const { id } = useParams<IdParams>();
  const [project, setProject] = useState(defaultProject)
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [projectOriginal, setProjectOriginal] = useState(defaultProject)
  const classes = useStyles();

  function getProject() {
    apiCall(`http://localhost:9090/api/projects/${id}`, {
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
      setProject(json)
      setProjectOriginal(json)
      dispatch(getProjectAction(json))
    })
  }

  const handleSave = () => {
    const body = {
      name: project.name,
      description: project.description
    }
    try {
      apiCall(`http://localhost:9090/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify(body)
      }, false)

      setProjectOriginal(project)
      dispatch(editProjectAction(project))
    } catch (error) {
      alert('Error editing Project')
    }
  }
  const handleOnChange = (key: String) => (evt: any) => {
    switch (key) {
      case 'name': {
        setProject({ ...project, name: evt.target.value })
        break
      }
      case 'description': {
        setProject({ ...project, description: evt.target.value })
        break
      }
    }
  }

  function getDynamicButtons() {
    const btns: IButtonsNavBar[] = [{ path: `/${project.projectId}`, name: `Project - ${project.projectId}` }];
    project.issuesIds.map((issue: any) => { btns.push({ path: `${project.projectId}/issue/${issue.toString()}`, name: `Issue - ${issue.toString()}` }) })
    return btns
  }

  useEffect(() => {
    if (!dialogOpen) {
      getProject();
      getDynamicButtons();
    }
  }, [dialogOpen]);

  return (
    <div>
      <Grid container spacing={1} direction={'column'}>
        <Stack direction="row">
          <SideBarMenu dynamicButtons={getDynamicButtons()} selected={`/${project.projectId}`} />
          <Grid item md={12} className={classes.layout}>
            <Typography variant="h4">
              Project Details
            </Typography>
            <Grid className={classes.infoSection}>
              <Callout
                message={PageInfo.PROJECT_PAGE}
                icon={<InfoIcon className={classes.infoColor} />}
              />
            </Grid>
            <Grid container spacing={1} direction={'column'} className={classes.layout}>
              <Grid item md={12}>
                <TextField id="standard-basic" label="Project Owner" variant="standard" value={project.projectOwner} disabled />
              </Grid>
              <Grid item md={12}>
                <TextField id="standard-basic" label="Project Id" variant="standard" value={project.projectId} disabled />
              </Grid>
              <Grid item md={12}>
                <TextField
                  id="standard-basic"
                  label="Project Name"
                  variant="standard"
                  value={project.name}
                  disabled={project.projectOwner !== getUsername()}
                  onChange={handleOnChange('name')}
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  id="standard-basic"
                  label="Project Description"
                  variant="standard"
                  value={project.description}
                  disabled={project.projectOwner !== getUsername()}
                  onChange={handleOnChange('description')}
                />
              </Grid>
              <Stack direction="row" spacing={2}>
                {project.projectOwner === getUsername() && (
                  <Button variant="outlined" onClick={() => { setProject(projectOriginal) }} disabled={project.name === projectOriginal.name && project.description === projectOriginal.description}>
                    Discard
                  </Button>
                )}
                {project.projectOwner === getUsername() && (
                  <Button variant="outlined" onClick={handleSave} disabled={project.name === projectOriginal.name && project.description === projectOriginal.description}>
                    Save
                  </Button>
                )}
              </Stack>
            </Grid>
            <Grid className={classes.layout}>
              <Stack direction="row">
                <Typography variant="subtitle2" className={classes.topMargin}>
                  Add new Issue
                </Typography>
                <IconButton
                  onClick={() => { setDialogOpen(true) }}
                >
                  <AddIssue />
                </IconButton>
                <CreateIssueDialog
                  projectId={id}
                  onClose={() => {
                    setDialogOpen(false)
                  }}
                  open={dialogOpen}
                />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Grid>
    </div>
  );
}
export default Project
