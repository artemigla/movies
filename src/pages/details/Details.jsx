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
import style from './style.module.scss';
import { ThemeContext } from '../../context/theme-context.js';


export const Details = () => {
  const { ids } = useParams();
  const { data } = useFetch(`/movie/${ids}?api_key=${KEY}`);
  const [isLoading, setIsLoading] = useState(false);
  const { url } = useSelector(state => state?.main);
  const { theme } = useContext(ThemeContext);
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
    <div className={style.container} style={{ backgroundColor: theme.background, color: theme.color }}>
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
          <div className={style.detail}>
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
            <div className={style.genre}><p>Genres:</p>
              {data?.genres?.map(({ id, name }) => (
                <SkeletonTheme key={id} color="#505050" highlightColor="#999">
                  <div className={style.wrappergenres}>
                    {isLoading ? <span className={style.genretitle}>{name}</span> : <Skeleton duration={2} className={style.skeletontitle} />}
                  </div>
                </SkeletonTheme>
              ))}
            </div>
            <hr />
            <div className={style.info}><b>Status: </b><p>{data?.status}</p>
              <span className={style.datan}><b>Release data: </b> <p>{dayjs(data?.release_date).format("MMMM D, YYYY")}</p>
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
              </span>
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
