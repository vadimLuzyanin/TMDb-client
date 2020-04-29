import React from 'react'
import { Typography, Paper, makeStyles } from '@material-ui/core'


const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '25px'
    }
})

const Loader = () => {
    const classes = useStyles()

    return (
        <Paper
            elevation={6}
            className={classes.root}
        >
            <Typography variant='h2'>
                Loading...
            </Typography>
        </Paper>
    )
}

export default Loader
