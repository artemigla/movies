import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import dayjs from "dayjs";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { KEY } from '../../constants/CONSTANTS.js';
import { useState } from 'react';
import { useFetch } from '../../hooks/useFetch.jsx';
import { Rating } from '../../components/rating/Rating';
import { VideoPlayer } from '../video/VideoPlayer';
import { Actors } from '../actors/Actors';
import { Recommendations } from '../recommendations/Recommendations';
import { Comments } from './Comments';
import style from './style.module.scss';

export const Details = () => {
  const { ids } = useParams();
  const { data } = useFetch(`/movie/${ids}?api_key=${KEY}`);
  const { url } = useSelector((state) => state?.main);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 1500);
  }, []);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.overviewContent}>
          {(
            <div>
              <SkeletonTheme color="#505050" highlightColor="#999">
                {isLoading ? <img className={style.img} src={url?.backdrop + data?.backdrop_path} alt={data?.backdrop_path} /> :
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
        <div className={style.titleRecommendation}>
          <Actors id={data?.id} />
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
