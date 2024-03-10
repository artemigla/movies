import React, { useState, useEffect } from "react";
import style from './style.module.scss';
import { Link } from "react-router-dom";
import { BASE_URL_IMAGES } from "../../constants/CONSTANTS";
import { Rating } from "../rating/Rating";
import { useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export const ShowMovies = () => {

  const [isLoading, setIsLoading] = useState(true);

  const selector = useSelector(state => state.movies.movies);
  window.scroll(0, 0);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [])

  return (
    <div className={style.container}>
      <div className={style.movies}>
        <SkeletonTheme color="#505050" highlightColor="#333">
          {!isLoading ? <h4>Movies</h4> : <Skeleton duration={2} className={style.moviesSceleton} />}
        </SkeletonTheme>
      </div>
      <div className={style.wrapper}>
        {selector.map(({ id, backdrop_path, title, vote_average }) => {
          return (
            <Link to={`/details/${id}`} key={id} className={style.wrappercarts}>
              <div className={style.carts}>
                <SkeletonTheme color="#505050" highlightColor="#999">
                  {!isLoading ? <img className={style.img} src={`${BASE_URL_IMAGES}${backdrop_path}`} alt="" />
                    : <Skeleton duration={2} className={style.imgsceleton} />
                  }
                </SkeletonTheme>
                <div className={style.rating} >
                  <SkeletonTheme color="#505050" highlightColor="#999">
                    {!isLoading ?
                      <Rating rating={Number(vote_average).toFixed(1)} /> :
                      <Skeleton duration={2} className={style.skeleton} />}
                  </SkeletonTheme>
                </div>
                <SkeletonTheme color="#505050" highlightColor="#999">
                  {!isLoading ?
                    <span className={style.title}>{title}</span> :
                    <Skeleton duration={2} className={style.titleSceleton} />}
                </SkeletonTheme>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
