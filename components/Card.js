import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { reformatDate } from '../util/reformatDate';
import ImageCarousel from '../components/ImageCarousel';
import axios from 'axios';
import { shuffle } from '../util/shuffle';
import YoutubeEmbed from './YouTubeEmbed';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { isMobile } from 'react-device-detect';

export default function Card({ movie, genres, filter }) {
  const length = 120;
  const [overview, setOverview] = useState(null);
  const [expand, setExpand] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [trailers, setTrailers] = useState(null);
  const [currentTrailer, setCurrentTrailer] = useState(null);

  const expandText = (option) => {
    if(option === true) {
      setOverview(movie?.overview);
      setExpand(true);
      setScroll(true);
    } else {
      setOverview(movie?.overview.substring(0, length));
      setExpand(false);
      setScroll(true);
    }
  };

  useEffect(() => {
    const hashId = `anchor-${movie?.id}`;
    const element = document.getElementById(hashId);
    if (element && mounted && scroll && !isMobile) {
      element.scrollIntoView({
        block: 'center',
        inline: 'center',
        behavior: 'smooth',
      });
    }

    if(expand || !expand) {
      setCurrentTrailer(null);
    }

    if(expand) {
      setOverview(movie?.overview);
    }
    else {
      setOverview(movie?.overview.substring(0, length));
    }

  }, [expand]);

  useEffect(() => {
    setMounted(true);
  }, [])

  useEffect(() => {
    const source = axios.CancelToken.source();

    if(mounted) {
      const fetchData = async() => {
        try {
          await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB}&language=en-US`).then((movie) => {
            setTrailers(movie?.data?.results.filter((mov) => mov.official === true && mov.type === "Trailer" && mov.site === "YouTube"))
          });
        } catch(error) {
          console.log(error)
        }
      };
      fetchData();
    }

    return () => source.cancel()
  }, [expand]);

  useEffect(() => {
    setExpand(false);
    setScroll(false);
  }, [filter]);

  const handleExpand = () => {
    setExpand(!expand);
    setScroll(true);
  }

  return(
    <div 
      className={styles.card} 
      style={expand ? { maxWidth: '35rem' } : { maxWidth: '22rem' }}
    >
      <div onClick={e => handleExpand()} className={styles.clickable}>
        {movie?.poster_path &&
          <div className={styles.cover}>
            <ImageCarousel imgs={createImgArray(movie)} exp={expand} />
          </div>
        }
        <section id={`anchor-${movie?.id}`}></section>
        <h2>{movie?.original_title}</h2>
        <div className={styles.ratingContainer}>
          <h3 className={styles.rating}>{movie?.vote_average}/10 ({movie?.vote_count} reviews)</h3>
          <a className={styles.tmdb} href="https://www.themoviedb.org/" target="_blank">
            <img src={'/images/tmdb.svg'} className={styles.tmdbLogo}/>
          </a>
        </div>
        <div className={styles.extraInfo}>
          <strong className={styles.date}>Release Date: {reformatDate(movie?.release_date) || 'Unknown'}</strong>
          <div className={styles.genreList}>
            {genres && 
              <strong className={styles.genre}>Genres: </strong>
            }
            {genres?.map((gen, key) => {
              return (
                <strong className={styles.genre} key={key}>
                  {gen}{genres.length !== key + 1 ? ", " : ""}
                </strong>
              );
            })}
          </div>
        </div>
        <div className={styles.spacer} />
        <p>{overview}</p>
      </div>
      {expand && trailers?.length > 0 &&  
        <h3 className={styles.date} style={{ marginBottom: '-0.15rem' }}>Official Trailers:</h3>
      }
      {expand && trailers?.map((trail, key) => {
          return (
            <div
              key={key}
              onClick={e => setCurrentTrailer(trail.key)}
              className={styles.trailers}
            >
              <YouTubeIcon style={{ color: '#E50914' }}/> 
              <p style={{ marginLeft: '0.4rem', marginTop: '0.15rem' }}>{trail.name}</p>
            </div>
          );
      })}  
      {currentTrailer &&
        (<YoutubeEmbed embedId={currentTrailer} />)
      } 
      <div className={styles.spacer} />
      {!expand ? (
        <span onClick={e => expandText(true)} className={styles.content}>more...</span>
      ) : expand ? (
        <span onClick={e => expandText(false)} className={styles.content}>...less</span>
      ) : <></>
      }
    </div>
  );
}

function createImgArray(movie) {

  let imgs = [];
  let urls = [`https://image.tmdb.org/t/p/original${movie?.poster_path}`, `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`];

  // urls = shuffle(urls);

  imgs.push(
  {
    label: movie?.title || null,
    imgPath: urls[0] || null,
  },
  {
    label: movie?.title || null,
    imgPath: urls[1] || null,
  }
  );

  return imgs;
}