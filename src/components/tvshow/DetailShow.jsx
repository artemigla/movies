import React from 'react';
import { BASE_URL_IMAGES } from '../../constants/CONSTANTS';
import style from './style.module.scss';
import { Rating } from '../rating/Rating';

export const DetailShow = ({ backdrop_path, first_air_date, last_air_date, vote_average, name, origin_country, overview }) => {

    window.scroll(0, 0)
    console.log('Detail');
    return (
        <div className={style.wrapper}>
            <div className={style.wrapperimg}>
                <img className={style.img ? style.img : null} src={`${BASE_URL_IMAGES}${backdrop_path}`} alt={name} />
                <span className={style.average}>
                    <Rating rating={Number(vote_average).toFixed(1)} />
                </span>
                <span className={style.title}>{name}</span>
            </div>
            <div className={style.content}>
                <div><i>{overview}</i></div>
                <div><p>{first_air_date}</p></div>
                <span>{last_air_date}</span>
                <p>{origin_country}</p>
            </div>
        </div>
    );
}