import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from "dayjs";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { KEY } from '../../constants/CONSTANTS.js';
import { useState } from 'react';
import { useFetch } from '../../hooks/useFetch.jsx';
import { Rating } from '../../components/rating/Rating';
import { VideoPlayer } from '../video/VideoPlayer';
import { Cast } from '../actors/Cast.jsx';
import { Recommendations } from '../recommendations/Recommendations';
import { Comments } from './Comments';
import NoPoster from '../../assets/noposter.jpg';
import { useSelector } from 'react-redux';
import { ThemeContext } from '../../context/ThemeContext.js';
import style from './style.module.scss';

export const Details = () => {
  const { ids } = useParams();
  const { theme, darkMode } = useContext(ThemeContext);
  const { data } = useFetch(`/movie/${ids}?api_key=${KEY}`);
  const [isLoading, setIsLoading] = useState(false);
  const { url } = useSelector(state => state?.main);

  const posterUrl = data?.poster_path
    ? url?.poster + data?.poster_path
    : NoPoster;

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 700);
  }, [isLoading]);

  return (
    <div className={style.container} style={{
      background: darkMode ? theme?.dark?.background : theme?.light?.background,
      color: darkMode ? theme?.dark?.color : theme?.light?.color
    }}>
      <div className={style.wrapper}>
        <div className={style.backdrop}>
          <img src={url?.backdrop + data?.backdrop_path} alt='' />
        </div>
        <div className={style.overviewContent}>
          {(
            <div className={style.blockimg}>
              <SkeletonTheme color="#505050" highlightColor="#999">
                {isLoading ? <img className={style.img} src={posterUrl} alt={data?.original_title} /> :
                  <Skeleton duration={2} className={style.img} />
                }
              </SkeletonTheme>
              <SkeletonTheme color="#505050" highlightColor="#999">
                {isLoading ?
                  <div className={style.average}>
                    <Rating rating={Number(data?.vote_average).toFixed(1)} />
                  </div> : <Skeleton duration={2} className={style.average} />
                }
              </SkeletonTheme>
            </div>
          )}
          <div className={style.detail} style={{ color: darkMode ? theme?.dark?.color : theme?.light?.color }}>
            <div className={style.title}>
              <SkeletonTheme color="#505050" highlightColor="#999">
                {isLoading ?
                  <h3 className={style.skeletontitle}>{data?.original_title} <span>({parseInt(data?.release_date)})</span></h3>
                  : <Skeleton duration={2} className={style.skeletontitle} />
                }
              </SkeletonTheme>
            </div>
            <SkeletonTheme color="#505050" highlightColor="#999">
              {isLoading ?
                <div className={style.overview}>
                  <i>{data?.overview}</i>
                </div>
                : <Skeleton duration={2} className={style.skeletonoverview} />
              }
            </SkeletonTheme>
            <p>Genres:</p>
            <div className={style.genre}>
              {data?.genres?.map(({ id, name }) => (
                <SkeletonTheme key={id} color="#505050" highlightColor="#999">
                  <div className={style.wrappergenres}>
                    {isLoading ? <span className={style.genretitle}>{name}</span> : <Skeleton duration={2} className={style.skeletontitle} />}
                  </div>
                </SkeletonTheme>
              ))}
            </div>
            <hr />
            <div className={style.info}>
              <div className={style.status}>
                <b>Status: </b>
                <span>{data?.status}</span>
              </div>
              <div className={style.release}>
                <b>Release data: </b>
                <span>{dayjs(data?.release_date).format("MMMM D, YYYY")}</span>
              </div>
              {data?.runtime && (
                <div className={style.infoitem}>
                  <span className={style.runtime}>
                    Runtime:{" "}
                  </span>
                  <span className={style.textruntime}>
                    {toHoursAndMinutes(
                      data?.runtime
                    )}
                  </span>
                </div>
              )}
            </div>
            <hr />
            <div className={style.videoWrapper}>
              <VideoPlayer />
            </div>
          </div>
        </div>
      </div>
      <div className={style.cast}>
        <Cast />
      </div>
      <div className={style.titleRecommendation}>
        <Recommendations />
      </div>
      <div>
        <Comments />
      </div>
    </div>
  )
}
