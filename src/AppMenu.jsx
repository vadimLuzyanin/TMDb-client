import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import { Drawer, Paper } from '@material-ui/core';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    marginLeft: '25px'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  drawer: {
    maxWidth: '250px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  emptyDrawer: {
    margin: '25px 0'
  },
  tmdb: {
    marginBottom: '15px'
  }
}));

const AppMenu = ({ setSearchState, favoriteCards }) => {

  const classes = useStyles();

  const [innerSearchState, setInnerSearchState] = useState('')

  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleChange = (e) => {
    setInnerSearchState(e.target.value.trim())
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchState(innerSearchState)
    }, 100)
    return () => {
      clearTimeout(timer)
    }
  }, [innerSearchState, setSearchState])

  const handleClearSearch = () => {
    setSearchState('')
    setInnerSearchState('')
  }

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={() => setDrawerOpen(true)}
          >
            <FavoriteBorderIcon />
          </IconButton>
          <Link to='/' style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClearSearch}
            >
              <HomeIcon />
            </IconButton>
          </Link>

          <Typography className={classes.title} variant="h6" noWrap>
            TMDb client
          </Typography>

          <Link to='/' style={{ color: 'inherit', textDecoration: 'inherit' }}>

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Поиск..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={innerSearchState}
                onChange={handleChange}
              />
            </div>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor='left'
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <div className={classes.drawer}>
          <Typography
            variant='h4'
            align='center'
          >
            Избранные фильмы
          </Typography>
          {(favoriteCards.length && favoriteCards) ||
            <Paper
              elevation={6}
              className={classes.emptyDrawer}>
              <Typography
                variant='h3'
                align='center'
              >
                Пока что вы не добавили ни один фильм в избранное
             </Typography>
            </Paper>}
          <img
            width='50%'
            className={classes.tmdb}
            src={'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'}
            alt='tmdb-logo'>
          </img>
          <Typography
            variant='caption'
            align='center'
          >
            This product uses the TMDb API but is not endorsed or certified by TMDb.
          </Typography>

        </div>
      </Drawer>
    </div>
  );
}

export default AppMenu