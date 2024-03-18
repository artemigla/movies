import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL_IMAGES, KEY } from "../../constants/CONSTANTS";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { SETTINGS } from "../../constants/CONSTANTS";
import { fetchDataFromApi } from '../../utils/api';
import style from './style.module.scss';

export const Recommendations = () => {
  const { ids } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchInitialData = () => {
    setIsLoading(true);
    fetchDataFromApi(`/movie/${ids}/recommendations?api_key=${KEY}`)
      .then((res) => {
        setData(res);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 1500);
  }, [isLoading]);

  useEffect(() => {
    setData(null);
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.container}>
      {data?.results.length ? <div className={style.titleRecommendation}>
        <SkeletonTheme color="#505050" highlightColor="#999">
          {isLoading ? <h2>Recommendation</h2> : <Skeleton duration={2} className={style.titleRecommendation} />}
        </SkeletonTheme>
      </div> : null}
      <Slider {...SETTINGS} className={style.slider} >
        {data?.results?.map((item) => (
          <div className={style.wrapper} key={item.id}>
            <SkeletonTheme color="#505050" highlightColor="#999">
              {isLoading ? <img className={style.img ? style.noimg : style.img} src={`${BASE_URL_IMAGES}${item.poster_path}`} alt="" />
                : <Skeleton duration={2} className={style.img} />}
              {isLoading ? <p className={style.title}>{item.title}</p> : <Skeleton duration={2} className={style.title} />}
            </SkeletonTheme>
          </div>
        ))}
      </Slider>
    </div>
  )
}
