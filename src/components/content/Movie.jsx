import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { BASE_URL_IMAGES, SETTINGS, KEY } from "../../constants/CONSTANTS.js";
import { Rating } from "../rating/Rating.jsx";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ThemeContext } from "../../context/ThemeContext.js";
import { useFetch } from "../../hooks/useFetch.jsx";
import style from "./style.module.scss";

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
  pauseOnHover: false,
};

export const Movie = () => {
  const { theme, darkMode } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useFetch(`/movie/popular?api_key=${KEY}`);
  const { data: results } = useFetch(`/discover/tv?api_key=${KEY}`);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 700);
  }, []);

  return (
    <div
      className={style.container}
      style={{
        background: darkMode
          ? theme?.dark?.background
          : theme?.light?.background,
        color: darkMode ? theme?.dark?.color : theme?.light?.color,
      }}
    >
      <div className={style.wrapperslider}>
        <Slider {...settings} className={style.slider}>
          {data?.results?.map((item) => (
            <div key={item.id} className={style.wrapperimg}>
              <SkeletonTheme color="#505050" highlightColor="#999">
                {isLoading ? (
                  <img
                    className={style.img}
                    key={item.id}
                    src={`${BASE_URL_IMAGES}${item?.backdrop_path}`}
                    alt=""
                  />
                ) : (
                  <Skeleton duration={2} className={style.img} />
                )}
              </SkeletonTheme>
            </div>
          ))}
        </Slider>
      </div>
      <div className={style.wrapper}>
        <div className={style.movies}>
          <Link to={"/showcontent/"}>
            <SkeletonTheme color="#505050" highlightColor="#999">
              {isLoading ? (
                "Movies"
              ) : (
                <Skeleton
                  duration={2}
                  width={120}
                  className={style.moviessceleton}
                />
              )}
            </SkeletonTheme>
          </Link>
        </div>
        {
          <Slider {...SETTINGS} className={style.slidermovies}>
            {data?.results?.map((item) => (
              <Link
                to={`/details/${item.id}`}
                key={item.id}
                className={style.imgcontainer}
              >
                <SkeletonTheme color="#505050" highlightColor="#999">
                  {isLoading ? (
                    <img
                      className={style.img}
                      key={item.id}
                      src={`${BASE_URL_IMAGES}${item?.backdrop_path}`}
                      alt=""
                    />
                  ) : (
                    <Skeleton duration={2} className={style.img} />
                  )}
                </SkeletonTheme>
                <span>
                  <SkeletonTheme color="#505050" highlightColor="#999">
                    {isLoading ? (
                      <Rating rating={Number(item.vote_average).toFixed(1)} />
                    ) : (
                      <Skeleton duration={2} className={style.skeleton} />
                    )}
                  </SkeletonTheme>
                </span>
              </Link>
            ))}
          </Slider>
        }
      </div>
      <div className={style.wrappercontainer}>
        <div className={style.title}>
          <Link to={"/tvshowcontent/"}>
            <SkeletonTheme color="#505050" highlightColor="#999">
              {isLoading ? (
                "Tv show"
              ) : (
                <Skeleton
                  duration={2}
                  width={120}
                  className={style.titlesceleton}
                />
              )}
            </SkeletonTheme>
          </Link>
        </div>
        <Slider {...SETTINGS} className={style.slider}>
          {results?.results?.map(({ id, backdrop_path, vote_average }) => (
            <Link to={`/tvshow/${id}`} key={id} className={style.wrapper}>
              <div className={style.imgwrapper}>
                <SkeletonTheme color="#505050" highlightColor="#999">
                  {isLoading ? (
                    <img
                      className={style.img}
                      key={id}
                      src={`${BASE_URL_IMAGES}${backdrop_path}`}
                      alt=""
                    />
                  ) : (
                    <Skeleton duration={2} className={style.img} />
                  )}
                </SkeletonTheme>
                <span>
                  <SkeletonTheme color="#505050" highlightColor="#999">
                    {isLoading ? (
                      <Rating rating={Number(vote_average).toFixed(1)} />
                    ) : (
                      <Skeleton duration={2} className={style.skeleton} />
                    )}
                  </SkeletonTheme>
                </span>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};
