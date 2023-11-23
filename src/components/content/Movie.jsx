import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesApi } from '../redux/slices/moviesSlice.js';
import Slider from "react-slick";
import { BASE_URL_IMAGES, SETTINGS } from "../../constants/CONSTANTS.js";
import style from './style.module.scss';
import { Rating } from "../rating/Rating.jsx";
import { Link } from "react-router-dom";
import { getTvShow } from "../redux/slices/tvSlice.js";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const settings = {
  dots: false,
  infinite: true,
  arrows: false,
  speed: 7000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  fade: true,
  autoplaySpeed: 3000,
  pauseOnHover: false
}

export const Movie = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state.movies.movies);
  const selectorShow = useSelector(state => state?.tvshow?.tvshow);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("")

  //window.scroll(0, 0);

  useEffect(() => {
    try {
      dispatch(getTvShow())
      dispatch(getMoviesApi())
    } catch (error) {
      console.log(error)
    }
  }, [dispatch])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setTitle("Movie");
    }, 1500);
  }, [])

  return (
    <div className={style.container}>
      <div className={style.wrapperslider}>
        <Slider {...settings} className={style.slider}>
          {selector?.map((item) => (
            <div key={item.id} className={style.wrapperimg}>
              <SkeletonTheme color="#505050" highlightColor="#999">
                {!isLoading ? <img className={style.img} key={item.id} src={`${BASE_URL_IMAGES}${item?.backdrop_path}`} alt="" />
                  : <Skeleton duration={2} className={style.img} />
                }
              </SkeletonTheme>
            </div>))}
        </Slider>
      </div>

      <div className={style.maincontent}>
        <div className={style.wrapper}>
          <Link to={'/showcontent/'} className={style.movies}>{!isLoading ? title : <Skeleton duration={2} width={60} className={style.movies} />}</Link>
          <Slider {...SETTINGS} className={style.slidermovies}>
            {selector.map((item) => (
              <Link to={`/details/${item.id}`} key={item.id} className={style.imgcontainer}>
                <SkeletonTheme color="#505050" highlightColor="#999">
                  {!isLoading ? <img className={style.img} key={item.id} src={`${BASE_URL_IMAGES}${item?.backdrop_path}`} alt="" />
                    : <Skeleton duration={2} className={style.img} />
                  }
                </SkeletonTheme>
                <span className={style.average}>
                  <SkeletonTheme color="#505050" highlightColor="#999">
                    {!isLoading ?
                      <Rating rating={Number(item.vote_average).toFixed(1)} /> :
                      <Skeleton duration={2} className={style.skeleton} />}
                  </SkeletonTheme>
                </span>
              </Link>
            ))}
          </Slider>
        </div>
      </div>

      <div className={style.wrappercontainer}>
        <Link to={'/tvshowcontent/'} className={style.title}>{!isLoading ? "Tv show" : <Skeleton duration={2} width={60} className={style.title} />}</Link>
        <Slider {...SETTINGS} className={style.slider}>
          {selectorShow.map(({ id, backdrop_path, vote_average }) => (
            <Link to={`/tvshow/${id}`} key={id} className={style.wrapper}>
              <div className={style.imgwrapper}>
                <SkeletonTheme color="#505050" highlightColor="#999">
                  {!isLoading ? <img className={style.img} key={id} src={`${BASE_URL_IMAGES}${backdrop_path}`} alt="" />
                    : <Skeleton duration={2} className={style.img} />
                  }
                </SkeletonTheme>
                <span className={style.average}>
                  <SkeletonTheme color="#505050" highlightColor="#999">
                    {!isLoading ?
                      <Rating rating={Number(vote_average).toFixed(1)} /> :
                      <Skeleton duration={2} className={style.skeleton} />}
                  </SkeletonTheme>
                </span>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  )
}
