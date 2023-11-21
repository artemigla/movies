import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesApi } from '../redux/slices/moviesSlice.js';
import Slider from "react-slick";
import { BASE_URL_IMAGES, SETTINGS } from "../../constants/CONSTANTS.js";
import style from './style.module.scss';
import { Rating } from "../rating/Rating.jsx";
import { Link } from "react-router-dom";
import { Tvshow } from "../tvshow/Tvshow.jsx";
import { Genres } from "../genres/Genres.jsx";

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

  useEffect(() => {
    try {
      dispatch(getMoviesApi())
    } catch (err) {
      console.log(err)
    }
  }, [dispatch])

  return (
    <div className={style.container}>
      <Genres />
      <div className={style.wrapperslider}>
        <Slider {...settings} className={style.slider}>
          {selector?.map((item) => (
            <div key={item.id} className={style.wrapperimg}>
              <img className={style.img} src={`${BASE_URL_IMAGES}${item?.backdrop_path}`} alt={item.title} />
            </div>))}
        </Slider>
      </div>

      <div className={style.maincontent}>
        <div className={style.wrapper}>
          <Link to={'/showcontent/'} className={style.movies}>Movies</Link>
          <Slider {...SETTINGS} className={style.slidermovies}>
            {selector.map((item) => (
              <Link to={`/details/${item.id}`} key={item.id} className={style.imgcontainer}>
                <img className={style.img} key={item.id} src={`${BASE_URL_IMAGES}${item?.backdrop_path}`} alt="" />
                <span className={style.average}>
                  <Rating rating={Number(item.vote_average).toFixed(1)} />
                </span>
              </Link>
            ))}
          </Slider>
        </div>
      </div>
      <div>
        <Tvshow />
      </div>
    </div>
  )
}
