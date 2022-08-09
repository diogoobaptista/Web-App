import React from 'react';
import { useHistory } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import LogOutIcon from '@material-ui/icons/Person'
import { removeCookie, getUsername } from '../utils';
import classNames from 'classnames'
import {
    Button,
    Grid,
    makeStyles,
    Popper,
    Typography,
    Box,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    color: {
        backgroundColor: '#d1cfcf'
    },
    buttonLogout: {
        marginTop: '32px',
        marginRight: '64px',
    },
}))

const Header = () => {
    const history = useHistory();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const handleClickOpen = () => {
        sessionStorage.removeItem('username')
        sessionStorage.setItem('logged', 'false')
        removeCookie('Bearer');
        history.push('/')
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    return (
        <Grid container className={classNames(classes.color)}>
            <Grid container justifyContent="center">
                <Typography variant="h4">
                    PROJECT MANAGEMENT APPLICATION
                </Typography>
            </Grid>
            <Grid container justifyContent="flex-end" className={classNames(classes.color)}>
                <Grid item className={classes.buttonLogout}>
                    <IconButton onClick={handleClick}>
                        <LogOutIcon />
                    </IconButton>
                    <Popper id={id} open={open} anchorEl={anchorEl}>
                        <Box sx={{ border: 3, p: 3, bgcolor: 'white' }}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2">
                                    Username: {getUsername()}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" onClick={handleClickOpen}>
                                    Sign Out
                                </Button>
                            </Grid>
                        </Box>
                    </Popper>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Header