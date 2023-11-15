import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCreditsMovies } from "../../components/redux/slices/creditsSlice";
import { BASE_URL_IMAGES } from "../../constants/CONSTANTS";
import style from './style.module.scss';

export const Credits = () => {
  const { ids } = useParams();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.credits.credits);
  const counterActors = [];
  const num = selector.length;

  for (let i = 0; i < num; i++) {
    counterActors.push(selector[i]);
    if (i === 10) {
      break;
    }
  }

  useEffect(() => {
    dispatch(getCreditsMovies(ids))
  }, [dispatch, ids])

  return (
    <div className={style.container}>
      <div className={style.title}>
        <h3>Credits</h3>
      </div>
      <div className={style.carts}>
        {counterActors.map((item) => (
          <div className={style.wrapper} key={item.id}>
            <img className={style.img} src={`${BASE_URL_IMAGES}${item?.profile_path}`} alt={item.name} />
            <p className={style.name}>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}