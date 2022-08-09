import React from 'react';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    colorBar: {
        backgroundColor: '#f2f2f2',
        color: 'inherit',
    },
});


export interface CalloutProps {
    message: string;
    icon: any;
}

const Callout: React.FC<CalloutProps> = ({
    message,
    icon,
    ...props
}) => {
    const classes = useStyles();
    return (
        <Alert icon={icon} classes={{ root: classes.colorBar }} {...props}>
            {message}
        </Alert>
    );
};

export default Callout;