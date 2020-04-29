import React, { useState, useEffect, useCallback } from 'react'
import { fetchDiscover, fetchSearch, fetchGenres, useGetMoviesByIds } from './fetchTMDb'
import InfiniteScroll from 'react-infinite-scroller'
import Card from './Card'
import AppMenu from './AppMenu'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MovieDetails from './MovieDetails'
import { CssBaseline, makeStyles } from '@material-ui/core'
import Loader from './Loader'
import Filter from './Filter'

const useStyles = makeStyles({
  root: {
    margin: '85px auto 0 auto'
  },
  cardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center'
  }
})

const App = () => {
  const classes = useStyles()

  const [favoriteList, setFavoriteList] = useState([])
  const [fetchedMovies, setFetchedMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [maxPage, setMaxPage] = useState(50)

  const [allGenreList, setAllGenreList] = useState([])

  const [searchState, setSearchState] = useState('')

  const [discoverSortBy, setDiscoverSortBy] = useState('popularity')
  const [discoverSortOrder, setDiscoverSortOrder] = useState('desc')

  useEffect(() => {
    fetchGenres(setAllGenreList)
  }, [])

  const switchFavorite = (id) => {
    if (favoriteList.includes(id)) {
      setFavoriteList(prev => prev.filter(item => item !== id))
    } else {
      setFavoriteList(prev => [...prev, id])
    }
  }

  useEffect(() => {
    const parsedFavoriteList = JSON.parse(localStorage.getItem('favoriteList'))
    if (parsedFavoriteList) {
      setFavoriteList(parsedFavoriteList)
    }
  }, [])

  useEffect(() => {
    const formattedFavoriteList = JSON.stringify(favoriteList)
    localStorage.setItem('favoriteList', formattedFavoriteList)
  }, [favoriteList])

  const cards = fetchedMovies.map((item) => {
    if (item.title) {
      return (
        <Card allGenreList={allGenreList} key={item.id} content={item} isFavorite={favoriteList.includes(item.id)} switchFavorite={switchFavorite} />
      )
    } else {
      return null
    }
  })

  const favoriteMoviesData = useGetMoviesByIds(favoriteList)

  const favoriteCards = favoriteMoviesData.map(item => <Card allGenreList={allGenreList} key={item.id} content={item} isFavorite={favoriteList.includes(item.id)} switchFavorite={switchFavorite} />)

  const loadMore = useCallback((page) => {
    if (searchState) {
      fetchSearch(page, searchState, setFetchedMovies, setCurrentPage, setMaxPage)
    } else {
      fetchDiscover(page, discoverSortBy, discoverSortOrder, setFetchedMovies, setCurrentPage, setMaxPage)
    }
  }, [searchState, discoverSortBy, discoverSortOrder])

  useEffect(() => {
    setFetchedMovies([])
    loadMore(1)
  }, [searchState, discoverSortBy, discoverSortOrder, loadMore])

  return (
    <BrowserRouter>
      <CssBaseline />
      <div>
        <AppMenu
          searchState={searchState}
          setSearchState={setSearchState}
          favoriteCards={favoriteCards} />
        <div className={classes.root}>
          <Switch >
            <Route
              path={`/details/:movieDetailId`}
              render={(props) =>
                <MovieDetails
                  key={props.location.key}
                  favoriteList={favoriteList}
                  switchFavorite={switchFavorite}
                  allGenreList={allGenreList}
                  {...props} />
              }>
            </Route>
            <Route path='/' exact>
              {!searchState &&
                <Filter
                  setDiscoverSortBy={setDiscoverSortBy}
                  setDiscoverSortOrder={setDiscoverSortOrder} />
              }
              <InfiniteScroll
                initialLoad={false}
                hasMore={currentPage < maxPage}
                loadMore={() => loadMore(currentPage + 1)}
                loader={
                  <div key={'loader'} className={classes.cardsContainer}>
                    <Loader />
                  </div>
                }
              >
                <div className={classes.cardsContainer}>
                  {cards}
                </div>
              </InfiniteScroll>
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
