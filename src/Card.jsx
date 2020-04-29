import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Paper, Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '200px',
        margin: '25px',
        minHeight: '500px',
        outline: props => props.isFavorite && '5px solid red'
    },
    imageContainer: {
        position: 'relative',
        overflow: 'hidden',
        height: '300px',
        width: '200px',
        backgroundImage: "url('http://placehold.jp/200x300.png')"
    },
    setFavoriteButton: {
        color: 'white',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        transform: props => props.hovered ? 'translateY(0)' : 'translateY(100%)',
        transition: '0.1s ease',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    link: {
        textDecoration: 'none',
        width: '100%'
    },
    linkButton: {
        minHeight: '100px'
    },
    genresContainer: {
        padding: '15px'
    }
})

const Card = ({ content, isFavorite, switchFavorite, allGenreList }) => {

    const [hovered, setHovered] = useState(false)

    const classes = useStyles({ isFavorite, hovered })

    const genres = content.genre_ids
        ? content.genre_ids.map(id => allGenreList.find(item => item.id === id).name).map((genre, index, array) => <span key={genre}>{genre}{index !== (array.length - 1) && ','} </span>)
        : content.genres
            ? content.genres.map((item, index, array) => <span key={item.name}>{item.name}{index !== (array.length - 1) && ','} </span>)
            : null

    const imageUrl = content.poster_path ? `https://image.tmdb.org/t/p/w500${content.poster_path}` : 'http://placehold.jp/200x300.png'

    return (
        <Paper
            elevation={6}
            className={classes.root}
        >
            <div className={classes.imageContainer}
                onMouseOver={() => {
                    setHovered(true)
                }}
                onMouseOut={() => {
                    setHovered(false)
                }}>
                <img
                    width='100%'
                    src={imageUrl}
                    alt='poster' >
                </img>
                <Button
                    variant='contained'
                    color='secondary'
                    fullWidth
                    onClick={() => switchFavorite(content.id)}
                    className={classes.setFavoriteButton}
                >
                    {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
                </Button>
            </div>
            <Link
                to={`/details/${content.id}/`}
                className={classes.link}
            >
                <Button
                    variant='outlined'
                    color='secondary'
                    fullWidth
                    className={classes.linkButton}>
                    <Typography align='center'>
                        {content.title}
                    </Typography>
                </Button>
            </Link>
            <div className={classes.genresContainer}>
                <Typography align='center'>
                    Жанры:
                    </Typography>
                <Typography align='center'>
                    {(genres.length && genres) || 'не найдено'}
                </Typography>
            </div>
        </Paper >
    )
}

export default Card
