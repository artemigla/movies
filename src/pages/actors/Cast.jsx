import React, { useEffect, useState, useContext } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BASE_URL_IMAGES, KEY } from "../../constants/CONSTANTS";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Slider from "react-slick";
import { SETTINGS } from "../../constants/CONSTANTS";
import { Link, useParams } from "react-router-dom";
import { fetchDataFromApi } from '../../utils/api';
import { ThemeContext } from "../../context/ThemeContext";
import style from './style.module.scss';

export const Cast = () => {
  const { ids } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { theme, darkMode } = useContext(ThemeContext);

  const fetchInitialData = () => {
    setIsLoading(true);
    fetchDataFromApi(`/movie/${ids}/credits?api_key=${KEY}`)
      .then((res) => {
        setData(res);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 700);

  }, []);

  useEffect(() => {
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.container}>
      {data?.cast?.length ? <div className={style.actors}>
        <SkeletonTheme color="#505050" highlightColor="#999">
          {isLoading ? <h2 className={style.titleskeleton} style={{ color: darkMode ? theme?.dark?.color : theme?.light?.color }}>Cast</h2> : <Skeleton className={style.titleskeleton} />}
        </SkeletonTheme>
      </div> : null}
      <Slider {...SETTINGS} className={style.slider}>
        {data?.cast?.map((item) => (
          <Link to={`/person/${item.id}`} className={style.wrapper} key={item.id}>
            <SkeletonTheme color="#505050" highlightColor="#999">
              {isLoading ?
                <img className={style.img} src={`${BASE_URL_IMAGES}${item?.profile_path}`} alt="" />
                : <Skeleton duration={2} className={style.skeletonimg} />
              }
              {isLoading ? <p className={style.name} style={{ color: darkMode ? theme?.dark?.color : theme?.light?.color }}>{item.name}</p> : <Skeleton duration={2} className={style.name} />}
              {isLoading ? <p className={style.character} style={{ color: darkMode ? theme?.dark?.color : theme?.light?.color }}>{item.character}</p> : ''}
            </SkeletonTheme>
          </Link>
        ))}
      </Slider>
    </div>
  )
}
