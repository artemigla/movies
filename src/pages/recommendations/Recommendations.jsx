import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecommendationsMovies } from "../../components/redux/slices/recommendationsSlice";
import { BASE_URL_IMAGES } from "../../constants/CONSTANTS";
import style from './style.module.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { SETTINGS } from "../../constants/CONSTANTS";

export const Recommendations = () => {
  const { ids } = useParams();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.recommendations.recommendations);

  useEffect(() => {
    dispatch(getRecommendationsMovies(ids))
  }, [dispatch, ids])

  return (
    <div>
      {selector.length ? <div className={style.titleRecommendation}>
        <h2>Recommendation</h2>
      </div> : null}
      <Slider {...SETTINGS} className={style.slider} >
        {selector.map((item) => (
          <div className={style.wrapper} key={item.id}>
            <img className={style.img ? style.noimg : style.img} src={`${BASE_URL_IMAGES}${item.poster_path}`} alt="" />
            <p className={style.title}>{item.title}</p>
          </div>
        ))}
      </Slider>
    </div >
  )
}
