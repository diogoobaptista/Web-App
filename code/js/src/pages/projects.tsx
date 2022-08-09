import React, {
    useEffect
} from 'react'
import { apiCall, getCookie, getUsername } from '../utils';
import {
    Grid,
    makeStyles,
    Typography
} from '@material-ui/core';
import DataTable from '../components/DataTable'
import InfoIcon from '@material-ui/icons/Info'
import Callout from '../components/Callout';
import { GridColDef, GridRowParams } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import ProjectDetails from '@material-ui/icons/FindInPage'
import DeleteProject from '@material-ui/icons/Delete'
import AddProject from '@material-ui/icons/Add'
import { useHistory } from 'react-router';
import { getProjectsAction, deleteProjectsAction } from '../actions/projectsActions';
import CreateProjectDialog from '../components/CreateProjectDialog';
import SideBarMenu from '../components/SideBarMenu'
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import PageInfo from '../enum/PageInfo';

const useStyles = makeStyles(() => ({
    infoColor: {
        color: '#4A4D4E'
    },
    infoSection: {
        padding: '16px'
    },
    align: {
        alignItems: 'center'
    },
    layout: {
        marginLeft: '64px',
        marginTop: '32px'
    },
}))

const Projects = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const projects = useSelector((state: any) => state.allProjects.projects)
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const classes = useStyles();

    function getProjects() {
        apiCall(`http://localhost:9090/api/projects`, {
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
            dispatch(getProjectsAction(json.projects))
        })
    }

    function handleOnClickDelete(projectId: any) {
        apiCall(`http://localhost:9090/api/projects/${projectId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
            },
            credentials: 'include',
            mode: 'cors'
        }, false).then(res => {
            if (res.status === 200) {
                const aux: any[] = []
                projects.filter(function (value: any) {
                    console.log(value)
                    if (value.projectId !== projectId) {
                        aux.push(value)
                    }
                })
                dispatch(deleteProjectsAction(aux))
            } else {
                alert('Error Deleting Project')
            }
            return res.json()
        })
    }

    const columns: GridColDef[] = [
        {
            field: "",
            width: 100,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (cellValues) => {
                return (
                    <Grid container>
                        <Grid>
                            <IconButton
                                onClick={() => { history.push(`project/${cellValues.row.projectId}`) }}
                            >
                                <ProjectDetails />
                            </IconButton>
                            {cellValues.row.projectOwner === getUsername() && (
                                <IconButton
                                    onClick={() => { handleOnClickDelete(cellValues.row.projectId) }}
                                >
                                    <DeleteProject />
                                </IconButton>
                            )}
                        </Grid>
                    </Grid>
                )
            },
        },
        { field: 'projectId', headerName: 'Project Id', width: 150 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'description', headerName: 'Description', width: 150 },
    ];

    useEffect(() => {
        if (!dialogOpen) {
            getProjects();
        }
    }, [dialogOpen]);

    return (
        <div>
            <Grid container spacing={1} direction={'column'}>
                <Stack direction="row">
                    <SideBarMenu selected='/projects' />
                    <Grid item md={12} className={classes.layout}>
                        <Typography variant="h4">
                            Projects
                        </Typography>
                        <Grid className={classes.infoSection}>
                            <Callout
                                message={PageInfo.PROJECTS_PAGE}
                                icon={<InfoIcon className={classes.infoColor} />}
                            />
                        </Grid>
                        <IconButton
                            onClick={() => { setDialogOpen(true); }}
                        >
                            <AddProject />
                        </IconButton>
                        <CreateProjectDialog
                            onClose={() => {
                                setDialogOpen(false)
                            }}
                            open={dialogOpen}
                        />
                        <DataTable
                            rows={projects}
                            columns={columns}
                            rowsPerPageOptions={[5, 10, 20]}
                        />
                    </Grid>
                </Stack>
            </Grid>

        </div>
    );
}
export default Projects
