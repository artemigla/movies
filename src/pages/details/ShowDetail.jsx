import React from "react";
import { BASE_URL_IMAGES } from "../../constants/CONSTANTS";
import { Rating } from "../../components/rating/Rating";
import style from './style.module.scss';
import dayjs from "dayjs";
import { Comments } from "./Comments";
import { Recommendations } from "../recommendations/Recommendations";
import { Actors } from "../actors/Actors";
import { VideoPlayer } from "../video/VideoPlayer";
import { Genres } from "../../components/genres/Genres";

export const ShowDetail = ({ id, poster_path, original_title, overview, release_date, vote_average }) => {

  return (
    <div className={style.wrapper}>
      <div className={style.overviewContent}>
        <div className={style.imgwrapper}>
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
            <span>
              {dayjs(release_date).format("MMMM D, YYYY")}
            </span>
            <span className={style.genre}>
              <Genres />
            </span>
          </div>
          <div className={style.videoWrapper}>
            <VideoPlayer />
          </div>
        </div>
      </div>
      <div className={style.titleRecommendation}>
        <Actors id={id} />
      </div>
      <div className={style.titleRecommendation}>
        <Recommendations />
      </div>
      <div>
        <Comments />
      </div>
    </div>
  )
}
