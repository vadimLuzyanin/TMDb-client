import React, { useEffect, useState } from 'react'
import { fetchMovie, fetchMovieImages, fetchRecommendations, fetchSimilar } from './fetchTMDb'
import { useParams } from 'react-router-dom'
import { Typography, Paper, Button, Link, makeStyles } from '@material-ui/core'
import Gallery from './Gallery'
import Card from './Card'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '25px'
    },
    tagline: {
        fontSize: '15px'
    },
    paper: {
        padding: '15px',
        marginBottom: '15px',
        minWidth: '35%'
    },
    paperRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    overview: {
        maxWidth: '1200px'
    },
    similarAndRecommendationsContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '25px',
        maxWidth: '90%'
    },
    similarAndRecommendationsInner: {
        display: 'flex',
        flexDirection: 'row',
        overflow: 'auto',
        maxWidth: '1200px',
        marginTop: '15px'
    }
})

const MovieDetails = ({ favoriteList, switchFavorite, allGenreList }) => {
    const classes = useStyles()

    const [movieData, setMovieData] = useState({})
    const [imagesData, setImagesData] = useState({})

    const { movieDetailId } = useParams()

    const [isFavorite, setIsFavorite] = useState(false)

    const [recommendations, setRecommendations] = useState({})
    const [similar, setSimilar] = useState({})

    useEffect(() => {
        setIsFavorite(favoriteList.includes(+movieDetailId))
    }, [favoriteList, movieDetailId])

    useEffect(() => {
        fetchMovie(movieDetailId, setMovieData)
        fetchMovieImages(movieDetailId, setImagesData)
        fetchRecommendations(movieDetailId, setRecommendations)
        fetchSimilar(movieDetailId, setSimilar)
    }, [movieDetailId])




    const images = imagesData.posters && imagesData.backdrops.map(image =>
        <img
            key={image.file_path}
            alt='backdrop'
            style={{ maxWidth: '100%' }}
            src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}>
        </img>)
    const genres = movieData.genres && movieData.genres.map((genre, index, array) =>
        <span key={genre.name}>
            {genre.name}{index !== (array.length - 1) && ', '}
        </span>)

    const recommendationsCards = recommendations.results && recommendations.results.map(item =>
        <Card
            key={item.id}
            content={item}
            isFavorite={favoriteList.includes(item.id)}
            allGenreList={allGenreList}
            switchFavorite={switchFavorite} />
    )
    const similarCards = similar.results && similar.results.map(item =>
        <Card
            key={item.id}
            content={item}
            isFavorite={favoriteList.includes(item.id)}
            allGenreList={allGenreList}
            switchFavorite={switchFavorite} />
    )

    const parseTime = (min) => {
        const minStr = min + ''
        const lastNumber = minStr[minStr.length - 1]
        switch (lastNumber) {
            case '1':
                return `${minStr} минута`
            case '2':
            case '3':
            case '4':
                return `${minStr} минуты`

            default:
                return `${minStr} минут`
        }
    }

    return (
        <div className={classes.root}>
            <Gallery images={images} />
            <Typography variant='h2' align='center'>{movieData.title}</Typography>
            {movieData.tagline ?
                <Typography variant='overline' align='center' className={classes.tagline}>{movieData.tagline}</Typography> : null
            }
            <Paper elevation={6} className={classes.paper}>
                {genres ?
                    <div className={classes.paperRow}>
                        <Typography variant='body1'>Жанры:</Typography>
                        <Typography variant='body1'>{genres}</Typography>
                    </div> : null
                }
                {movieData.budget ? <div className={classes.paperRow}>
                    <Typography variant='body1'>Бюджет:</Typography>
                    <Typography variant='body1'>{movieData.budget} $</Typography>
                </div> : null
                }
                {movieData.revenue ? <div className={classes.paperRow}>
                    <Typography variant='body1'>Доход:</Typography>
                    <Typography variant='body1'>{movieData.revenue} $</Typography>
                </div> : null
                }
                {movieData.release_date ? <div className={classes.paperRow}>
                    <Typography variant='body1'>Дата выхода:</Typography>
                    <Typography variant='body1'>{movieData.release_date}</Typography>
                </div> : null
                }
                {movieData.runtime ? <div className={classes.paperRow}>
                    <Typography variant='body1'>Длительность: </Typography>
                    <Typography variant='body1'>{parseTime(movieData.runtime)}</Typography>
                </div> : null
                }
                {movieData.vote_average ? <div className={classes.paperRow}>
                    <Typography variant='body1'>Средняя оценка: </Typography>
                    <Typography variant='body1'>{movieData.vote_average}</Typography>
                </div> : null
                }
                {movieData.vote_count ? <div className={classes.paperRow}>
                    <Typography variant='body1'>Количество оценок: </Typography>
                    <Typography variant='body1'>{movieData.vote_count}</Typography>
                </div> : null
                }
            </Paper>
            {movieData.overview ?
                <Typography
                    variant='h6'
                    align='center'
                    className={classes.overview}
                >
                    {movieData.overview}
                </Typography> : null}
            {movieData.homepage ?
                <Link
                    variant='h5'
                    href={movieData.homepage}
                >
                    Сайт фильма
                 </Link> : null}
            <Button
                variant='contained'
                color='secondary'
                onClick={() => switchFavorite(+movieDetailId)}
            >
                {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
            </Button>
            {similarCards && similarCards.length !== 0 &&
                <div className={classes.similarAndRecommendationsContainer}>
                    <Typography
                        variant='h4'
                        align='center'
                    >
                        Похожие фильмы
                    </Typography>
                    <Paper
                        elevation={6}
                        className={classes.similarAndRecommendationsInner}
                    >
                        {similarCards}
                    </Paper>
                </div>}
            {recommendationsCards && recommendationsCards.length !== 0 &&
                <div className={classes.similarAndRecommendationsContainer}>
                    <Typography
                        variant='h4'
                        align='center'
                    >
                        Рекомендуемые фильмы
                    </Typography>
                    <Paper
                        elevation={6}
                        className={classes.similarAndRecommendationsInner}
                    >
                        {recommendationsCards}
                    </Paper>
                </div>}
        </div>
    )
}

export default MovieDetails
