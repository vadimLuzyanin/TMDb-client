import React, { useState } from 'react'
import { Button, makeStyles } from '@material-ui/core'

import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        maxWidth: '500px',
        maxHeight: '280px'
    },
    arrowLeft: {
        height: '100%',
        position: 'absolute',
        left: '0',
        color: 'white',
        zIndex: 100
    },
    arrowRight: {
        height: '100%',
        position: 'absolute',
        right: '0',
        color: 'white',
        zIndex: 101
    },
    arrowIcon: {
        fontSize: '50px'
    },
    imgContainer: {
        overflow: 'hidden'
    },
    imgContainerInner: {
        display: 'flex',
        flexDirection: 'row',
        transform: props => `translateX(${props.imageVisible * -100}%)`,
        transition: '0.3s ease',
        zIndex: 1
    }
})

const Gallery = ({ images }) => {
    const [imageVisible, setImageVisible] = useState(0)

    const classes = useStyles({ imageVisible })

    const rotateBack = () => {
        const sliderLength = images.length - 1
        setImageVisible(prev => prev <= 0 ? sliderLength : prev - 1)
    }

    const rotateForward = () => {
        const sliderLength = images.length - 1
        setImageVisible(prev => prev >= sliderLength ? 0 : prev + 1)
    }

    return (
        <div className={classes.root}>
            <Button
                className={classes.arrowLeft}
                onClick={rotateBack}>
                <KeyboardArrowLeftIcon className={classes.arrowIcon} />
            </Button>
            <div className={classes.imgContainer}>
                <div className={classes.imgContainerInner}>
                    {images}
                </div>
            </div>
            <Button
                className={classes.arrowRight}
                onClick={rotateForward}>
                <KeyboardArrowRightIcon className={classes.arrowIcon} />
            </Button>
        </div>
    )
}

export default Gallery
