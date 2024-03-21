import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BASE_URL_IMAGES, KEY } from "../../constants/CONSTANTS";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Slider from "react-slick";
import { SETTINGS } from "../../constants/CONSTANTS";
import { Link, useParams } from "react-router-dom";
import { fetchDataFromApi } from '../../utils/api';
import style from './style.module.scss';

export const Cast = () => {
  const { ids } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
          {isLoading ? <h2 className={style.titleskeleton}>Cast</h2> : <Skeleton className={style.titleskeleton} />}
        </SkeletonTheme>
      </div> : null}
      <Slider {...SETTINGS} className={style.slider}>
        {data?.cast?.map((item) => (
          <Link to={`/person/${item.id}`} className={style.wrapper} key={item.id}>
            <SkeletonTheme color="#505050" highlightColor="#999">
              {isLoading ?
                <img className={style.img ? style.noimg : style.img} src={`${BASE_URL_IMAGES}${item?.profile_path}`} alt="" />
                : <Skeleton duration={2} className={style.skeletonimg} />
              }
              {isLoading ? <p className={style.name}>{item.name}</p> : <Skeleton duration={2} className={style.name} />}
            </SkeletonTheme>
          </Link>
        ))}
      </Slider>
    </div>
  )
}
