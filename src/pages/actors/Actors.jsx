import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActorsMovies } from "../../components/redux/slices/actorsSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BASE_URL_IMAGES } from "../../constants/CONSTANTS";
import Slider from "react-slick";
import style from './style.module.scss';
import { SETTINGS } from "../../constants/CONSTANTS";
import { Link } from "react-router-dom";

export const Actors = ({id}) => {

  const dispatch = useDispatch();
  const selector = useSelector(state => state?.actors?.actors);

  useEffect(() => {
    dispatch(getActorsMovies(id))
  }, [dispatch, id])

  return (
    <div className={style.container}>
      {selector.length ? <div className={style.actors}>
        <h2>Actors</h2>
      </div> : null}
      <Slider {...SETTINGS} className={style.slider}>
        {selector.map((item) => (
          
          <Link to={`/person/${item.id}`} className={style.wrapper} key={item.id}>
            <img className={style.img ? style.noimg : style.img} src={`${BASE_URL_IMAGES}${item?.profile_path}`} alt="" />
            <p className={style.name}>{item.name}</p>
          </Link>
        ))}
      </Slider>
    </div>
  )
}
