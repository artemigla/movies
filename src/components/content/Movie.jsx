import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { BASE_URL_IMAGES, SETTINGS, KEY } from "../../constants/CONSTANTS.js";
import { Rating } from "../rating/Rating.jsx";
import { Link } from "react-router-dom";
import { getTvShow } from "../redux/slices/tvSlice.js";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { fetchDataFromApi } from '../../utils/api';
import style from './style.module.scss';

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
  const selectorShow = useSelector(state => state?.tvshow.tvshow);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  window.scroll(0, 0);

  const fetchInitialData = () => {
    setIsLoading(true);
    fetchDataFromApi(`/movie/popular?api_key=${KEY}`)
      .then((res) => {
        setData(res);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    try {
      dispatch(getTvShow())      
    } catch (error) {
      console.log(error)
    }
  }, [dispatch])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setTitle("Movie");
    }, 500);
    fetchInitialData();
  }, [])

  return (
    <div className={style.container}>
      <div className={style.wrapperslider}>
        <Slider {...settings} className={style.slider}>
          {data?.results?.map((item) => (
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
            {data?.results?.map((item) => (
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
          {selectorShow?.map(({ id, backdrop_path, vote_average }) => (
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
