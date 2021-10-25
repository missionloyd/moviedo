import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { reformatDate } from '../util/reformatDate';

export default function Card({ movie, genres }) {
  const length = 118;
  const text = movie?.overview + " ";
  const modifiedText = movie?.overview.substring(0, length) + " ";
  const [overview, setOverview] = useState(text.length > length ? modifiedText : text);
  const [expand, setExpand] = useState(text.length > length ? false : true);
  const [mounted, setMounted] = useState(false);

  const expandText = (option) => {
    if(option === true) {
      setOverview(text);
      setExpand(true);
    } else {
      setOverview(modifiedText);
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
    setMounted(true);

  }, []);

  return(
    <div 
      className={styles.card} 
      onClick={e => expandText(!expand)}
      style={expand ? { maxWidth: '90%' } : { maxWidth: '28rem' }}
    >
      {movie?.poster_path &&
        <img 
          className={styles.poster}
          src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`} 
        />
      }
      <h2>{movie?.original_title}</h2>
      <div className={styles.ratingContainer}>
        <h3 className={styles.rating}>{movie?.vote_average}/10 ({movie?.vote_count} reviews)</h3>
        <img src={'/images/tmdb.svg'} className={styles.tmdb}/>
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
      <section id={`anchor-${movie?.id}`}></section>
      <div className={styles.spacer} />
      <p>{overview}</p>
      {!expand && text.length > length ? (
        <span onClick={e => expandText(true)} className={styles.content}>more...</span>
      ) : expand && text.length > length ? (
        <span onClick={e => expandText(false)} className={styles.content}>...less</span>
      ) : <></>
      }
    </div>
  );
}