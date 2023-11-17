import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCreditsMovies } from "../../components/redux/slices/creditsSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BASE_URL_IMAGES } from "../../constants/CONSTANTS";
import Slider from "react-slick";
import style from './style.module.scss';
import { SETTINGS } from "../../constants/CONSTANTS";

export const Actors = () => {
  const { ids } = useParams();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.credits.credits);

  useEffect(() => {
    dispatch(getCreditsMovies(ids))
  }, [dispatch, ids])

  return (
    <div className={style.container}>
      {selector.length ? <div className={style.actors}>
        <h2>Actors</h2>
      </div> : null}
      <Slider {...SETTINGS} className={style.slider}>
        {selector.map((item) => (
          <div className={style.wrapper} key={item.id}>
            <img className={style.img ? style.noimg : style.img} src={`${BASE_URL_IMAGES}${item?.profile_path}`} alt="" />
            <p className={style.name}>{item.name}</p>
          </div>
        ))}
      </Slider>
    </div>
  )
}
