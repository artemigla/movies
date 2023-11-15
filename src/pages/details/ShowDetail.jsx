import React from "react";
import { BASE_URL_IMAGES } from "../../constants/CONSTANTS";
import { Rating } from "../../components/rating/Rating";
import style from './style.module.scss';
import dayjs from "dayjs";
import { Reviews } from "./Reviews";
import { Recommendations } from "../recommendations/Recommendations";
import { Credits } from "../credits/Credits";
import { VideoPlayer } from "../video/VideoPlayer";

export const ShowDetail = ({ poster_path, original_title, overview, release_date, vote_average }) => {
  return (
    <div className={style.wrapper} >
      <div className={style.overviewContent}>
        <div>
          <img className={style.img} src={`${BASE_URL_IMAGES}${poster_path}`} alt={original_title} />
          <div className={style.average}>
            <Rating rating={Number(vote_average).toFixed(1)} />
          </div>
        </div>
        <div className={style.detail}>
          <div className={style.title}>
            <h3>{original_title}</h3>
          </div>
          <div className={style.overview}>
            <i >{overview}</i>
          </div>
          <div>
          </div>
          <div className={style.data} >
            <span >
              {dayjs(release_date).format("MMMM D, YYYY")}
            </span>
          </div>
          <div>
            <VideoPlayer />
          </div>
        </div>
      </div>
      <div className={style.titleRecommendation}>
        <Credits />
      </div>
      <div className={style.titleRecommendation}>
        <Recommendations />
      </div>
      <div>
        <Reviews />
      </div>
    </div>
  )
}