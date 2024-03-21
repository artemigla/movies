import React, { useEffect } from 'react';
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
import style from './style.module.scss';
import { useSelector } from 'react-redux';

export const Details = () => {
  const { ids } = useParams();
  const { data } = useFetch(`/movie/${ids}?api_key=${KEY}`);
  const [isLoading, setIsLoading] = useState(false);
  const { url } = useSelector(state => state?.main);

  const posterUrl = data?.poster_path
    ? url?.poster + data?.poster_path
    : NoPoster;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 700);
  }, [isLoading]);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
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
            <div className={style.data} >
              <SkeletonTheme color="#505050" highlightColor="#999">
                {isLoading ?
                  <span className={style.datan}>
                    {dayjs(data?.release_date).format("MMMM D, YYYY")}
                  </span> : <Skeleton duration={2} className={style.skeletondata} />
                }
              </SkeletonTheme>
              <div className={style.genre}>
                {data?.genres?.map(({ id, name }) => (
                  <SkeletonTheme key={id} color="#505050" highlightColor="#999">
                    <div className={style.wrappergenres}>
                      {isLoading ? <span className={style.title}>{name}</span> : <Skeleton duration={2} className={style.skeletontitle} />}
                    </div>
                  </SkeletonTheme>
                ))}
              </div>
            </div>
            <div className={style.videoWrapper}>
              <VideoPlayer />
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
    </div>
  )
}
