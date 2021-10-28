import axios from 'axios';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Filter from '../components/Filter';
import LoadingSpinner from '../components/LoadingSpinner';
import Button from '@material-ui/core/Button';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import styles from '../styles/Home.module.css';

export async function getServerSideProps(context) {
  const movies = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB}&language=en-US&page=1`);
  const genres = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB}&language=en-US`);

  return {
    props: { 
      movies: movies.data.results || null,
      genres: genres.data.genres || null,
    },
  };
}

export default function Home({ movies, genres }) {
  const classes = useStyles();
  const [queue, setQueue] = useState(movies);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [postsEnd, setPostsEnd] = useState(false);

  const getMoreMovies = async() => {
    setLoading(true);

    await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB}&language=en-US&page=${page}`).then((res) => {
      setPage(page + 1);

      const moreMovies = res.data.results || null;

      if (!moreMovies) {
        setPostsEnd(true);
      }
      else {
        setQueue(queue.concat(moreMovies));
        setFilter("")
      }
    });

    setLoading(false)
  }

  const scrollToTop = () => {
    const hashId = `anchor`;
    const element = document.getElementById(hashId);
    if (element) {
      element.scrollIntoView({
        block: 'center',
        inline: 'center',
        behavior: 'smooth',
      });
    }
  }

  useEffect(() => {
    scrollToTop();
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Moviedo</title>
        <meta name="description" content="Find the best films in theaters today!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section id="anchor" />
        <h1 className={styles.title}>
          Current Films <a href="https://moviedo.vercel.app/">Moviedo</a>
        </h1>

        <div className={styles.prompt}>
          <strong className={styles.description}>
            It all starts here:{' '}
          </strong>
          <Filter data={queue} filter={filter} setFilter={setFilter} setQueue={setQueue} />
        </div>

        <a href="https://github.com/missionloyd/moviedo" target="_blank">
          <div className={styles.creditsContainer}>
            <h1 className={styles.credits}>Created by Luke Macy</h1>
            <GitHubIcon style={{ color: '#E50914'}}/>
          </div>
        </a>
        
        <div className={styles.grid}>
          {queue?.map((movie, key) => {
            if(movie?.original_language === 'en') {

              const list = getMovieGenres(movie, genres)

              return(
                <Card movie={movie} genres={list} filter={filter} key={key} />
              );
            }
          })}
        </div>
        <ThemeProvider theme={theme}>
          {!loading && !postsEnd &&
            <Button 
              variant="outlined" 
              color="primary" 
              className={classes.moreMargin}
              onClick={getMoreMovies}
            >
              Get More Movies
            </Button>
          }
          <LoadingSpinner show={loading} />
          {postsEnd && 'Sorry, you have reached the end of the feed...'}
          <Button 
            variant="outlined" 
            color="default" 
            className={classes.margin}
            onClick={scrollToTop}
          >
            Scroll Back To Top
          </Button>
        </ThemeProvider>
      </main>
    </div>
  )
}

const getMovieGenres = (movie, genres) => {
  return movie?.genre_ids?.map((id) => {
    return (genres.find((gen) => gen.id === id))?.name;
  });
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#E50914',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(2),
  },
  moreMargin: {
    marginTop: theme.spacing(3)
  }
}));
