import React from "react";
import style from './style.module.scss';
import { Link } from "react-router-dom";
import { BASE_URL_IMAGES } from "../../constants/CONSTANTS";
import { Rating } from "../rating/Rating";
import { useSelector } from "react-redux";

export const ShowMovies = () => {
  
  const selector = useSelector(state => state.movies.movies);

  return (
    <div className={style.container}>
      <div className={style.movies}>
        <h4>Movies</h4>
      </div>
      <div className={style.wrapper}>
        {selector.map(({ id, poster_path, title, vote_average }) => (
          <Link to={`/details/${id}`}key={id} className={style.wrappercarts}>
            <div className={style.carts}>
              <img className={style.img} src={`${BASE_URL_IMAGES}${poster_path}`} alt="" />
              <div className={style.rating} > 
                <Rating rating={Number(vote_average).toFixed(1)} />
              </div>
              <span className={style.title}>{title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}


/*
 *
 *  <Slider {...SETTINGS} >
        <Link className={style.link} to={`/details/${id}`}>
          <img className={style.img} src={`${BASE_URL_IMAGES}${poster_path}`} alt={title} />
          <span className={style.average}>
            <Rating rating={Number(vote_average).toFixed(1)} />
          </span>
        </Link>
        <h3 className={style.title}>{title}</h3>
      </Slider>

 *   
 *
 *
 *
 *
 * */
