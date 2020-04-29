import { useState, useEffect } from "react"

const doFetchMovies = async (path, params) => {
    const BASE_URL = 'https://api.themoviedb.org/3/'
    const API_KEY = '0867e0e2e27f17e1b459b2d3ef7f5fdb'
    let url = `${BASE_URL}${path}?api_key=${API_KEY}`
    for (let param in params) {
        if (params[param]) {
            url += `&${param}=${params[param]}`
        }
    }
    const response = await fetch(url)
    const data = await response.json()
    return data
}

const fetchDiscover = (page, discoverSortBy, discoverSortOrder, setFetchedMovies, setCurrentPage, setMaxPage) => {
    doFetchMovies('discover/movie', { language: 'ru', page: page, sort_by: `${discoverSortBy}.${discoverSortOrder}` }).then(data => {
        setFetchedMovies(prev => [...prev, ...data.results])
        setCurrentPage(data.page)
        setMaxPage(data.total_pages)
    })
}

const fetchSearch = (page, query, setFetchedMovies, setCurrentPage, setMaxPage) => {
    doFetchMovies('search/movie', { language: 'ru', page: page, query: query }).then(data => {
        setFetchedMovies(prev => [...prev, ...data.results])
        setCurrentPage(data.page)
        setMaxPage(data.total_pages)
    })
}

const fetchGenres = (setAllGenreList) => {
    doFetchMovies('genre/movie/list', { language: 'ru' }).then(data => {
        setAllGenreList(data.genres)
    })
}

const fetchMovie = (movieId, setMovieData) => {
    doFetchMovies(`movie/${movieId}`, { language: 'ru' }).then(data => {
        setMovieData(data)
    })
}

const fetchMovieImages = (movieId, setImagesData) => {
    doFetchMovies(`movie/${movieId}/images`, { include_image_language: `null,ru` }).then(data => {
        setImagesData(data)
    })
}

const fetchRecommendations = (movieId, setRecommendations) => {
    doFetchMovies(`movie/${movieId}/recommendations`, { language: 'ru' }).then(data => {
        setRecommendations(data)
    })
}

const fetchSimilar = (movieId, setSimilar) => {
    doFetchMovies(`movie/${movieId}/similar`, { language: 'ru' }).then(data => {
        setSimilar(data)
    })
}

const useGetMoviesByIds = (ids) => {
    const [arr, setArr] = useState([])
    const [initialLoad, setInitialLoad] = useState(true)

    useEffect(() => {
        if (initialLoad) {
            ids.forEach(id => {
                doFetchMovies(`movie/${id}`, { language: 'ru' }).then(data => {
                    setArr(prev => [...prev, data])
                })
            })
            if (ids.length) {
                setInitialLoad(false)
            }
        } else {
            const filterDelete = arr.filter(item => ids.includes(item.id))
            const filterDeleteIds = filterDelete.map(item => item.id)
            const difference = ids.filter(id => !filterDeleteIds.includes(id))
            setArr(filterDelete)
            difference.forEach(id => {
                doFetchMovies(`movie/${id}`, { language: 'ru' }).then(data => {
                    setArr(prev => [...prev, data])
                })
            })
        }
    }, [ids])
    return arr
}

export { fetchDiscover, fetchSearch, fetchGenres, fetchMovie, fetchMovieImages, fetchRecommendations, fetchSimilar, useGetMoviesByIds }