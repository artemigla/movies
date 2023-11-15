import React from "react";
import style from './style.module.scss';
import { Link } from "react-router-dom";
import { BASE_URL_IMAGES } from "../../constants/CONSTANTS";
import { Rating } from "../rating/Rating";
export const ShowMovies = ({ id, poster_path, title, vote_average }) => {

  return (
    <div className={style.cards}>
      <Link className={style.link} to={`/details/${id}`}>
        <img className={style.img} src={`${BASE_URL_IMAGES}${poster_path}`} alt={title} />
        <span className={style.average}>
          <Rating rating={Number(vote_average).toFixed(1)} />
        </span>
      </Link>
      <h3 className={style.title}>{title}</h3>
    </div>

  )
}