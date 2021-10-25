import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { reformatDate } from '../util/reformatDate';
import ImageCarousel from '../components/ImageCarousel';
import { shuffle } from '../util/shuffle';

export default function Card({ movie, genres }) {
  const length = 118;
  const [overview, setOverview] = useState(null);
  const [expand, setExpand] = useState(null);
  const [mounted, setMounted] = useState(false);

  const expandText = (option) => {
    if(option === true) {
      setOverview(movie?.overview);
      setExpand(true);
    } else {
      setOverview(movie?.overview.substring(0, length));
      setExpand(false);
    }
  };

  useEffect(() => {
    const hashId = `anchor-${movie?.id}`;
    const element = document.getElementById(hashId);
    if (element && mounted) {
      element.scrollIntoView({
        block: 'center',
        inline: 'center',
        behavior: 'smooth',
      });
    }
  }, [expand]);


  useEffect(() => {
    setOverview(movie?.overview.length > length ? movie?.overview.substring(0, length) : movie?.overview);
  }, [movie.overview])

  useEffect(() => {
    setMounted(true);
  }, [])

  return(
    <div 
      className={styles.card} 
      onClick={e => expandText(!expand)}
      style={expand ? { maxWidth: '35rem' } : { maxWidth: '25rem' }}
    >
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
      {!expand && movie?.overview?.length > length ? (
        <span onClick={e => expandText(true)} className={styles.content}>more...</span>
      ) : expand && movie?.overview?.length > length ? (
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