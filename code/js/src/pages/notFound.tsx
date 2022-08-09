import React from 'react'
import {
    Grid,
    makeStyles,
    Typography
} from '@material-ui/core';
import SideBarMenu from '../components/SideBarMenu'
import Stack from '@mui/material/Stack';
import InfoIcon from '@material-ui/icons/Info'
import Callout from '../components/Callout';
import PageInfo from '../enum/PageInfo';
import Header from '../components/Header';


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
    }
}))

const NotFound = () => {
    const classes = useStyles();

    return (
        <div>
            <Header />
            <Grid container spacing={1} direction={'column'}>
                <Stack direction="row">
                    <SideBarMenu selected='/home' />
                    <Grid item md={12} className={classes.layout}>
                        <Typography variant="h4">
                            NotFound
                        </Typography>
                        <Grid className={classes.infoSection}>
                            <Callout
                                message={PageInfo.NOT_FOUND}
                                icon={<InfoIcon className={classes.infoColor} />}
                            />
                        </Grid>
                    </Grid>
                </Stack>
            </Grid>
        </div>
    );
}
export default NotFound
