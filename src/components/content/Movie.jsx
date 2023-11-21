import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesApi } from '../redux/slices/moviesSlice.js';
import Slider from "react-slick";
import { BASE_URL_IMAGES, SETTINGS } from "../../constants/CONSTANTS.js";
import style from './style.module.scss';
import { Rating } from "../rating/Rating.jsx";
import { Link } from "react-router-dom";
import { getTvShow } from "../redux/slices/tvSlice.js";

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

  window.scroll(0, 0)
  useEffect(() => {
    try {
      dispatch(getTvShow())
      dispatch(getMoviesApi())
    } catch (error) {
      console.log(error)
    }
  }, [dispatch])

  return (
    <div className={style.container}>
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

      <div className={style.wrappercontainer}>
          <span className={style.title}>Tv show</span>
          <Slider {...SETTINGS} className={style.slider}>
            {selectorShow.map(({ id, backdrop_path, vote_average }) => (
              <Link to={`tvshow/${id}`} key={id} className={style.wrapper}>
                <div className={style.imgwrapper}>
                  <img className={style.img ? style.img : null} src={`${BASE_URL_IMAGES}${backdrop_path}`} alt={''} />
                  <span className={style.average}>
                    <Rating rating={Number(vote_average).toFixed(1)} />
                  </span>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
    </div>
  )
}
