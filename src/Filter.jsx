import React, { useState, useEffect } from 'react'
import { Button, makeStyles } from '@material-ui/core'

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
    }
})

const Filter = ({ setDiscoverSortBy, setDiscoverSortOrder }) => {
    const classes = useStyles()

    const [chosenSort, setChosenSort] = useState({
        by: 'popularity',
        order: 'desc'
    })

    const handleSortChange = (by) => {
        if (by === chosenSort.by) {
            setChosenSort(prev => ({ ...prev, order: prev.order === 'desc' ? 'asc' : 'desc' }))
        } else {
            setChosenSort({ by: by, order: 'desc' })
        }
    }

    useEffect(() => {
        setDiscoverSortBy(chosenSort.by)
        setDiscoverSortOrder(chosenSort.order)
    }, [chosenSort, setDiscoverSortBy, setDiscoverSortOrder])

    return (
        <div className={classes.root}>
            <Button
                endIcon={chosenSort.order === 'asc' ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                variant={chosenSort.by === 'popularity' ? 'contained' : 'outlined'}
                color='primary'
                onClick={() => handleSortChange('popularity')}
            >
                Популярность
            </Button>
            <Button
                endIcon={chosenSort.order === 'asc' ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                variant={chosenSort.by === 'vote_count' ? 'contained' : 'outlined'}
                color='primary'
                onClick={() => handleSortChange('vote_count')}
            >
                Количество голосов
            </Button>
        </div>
    )
}

export default Filter
