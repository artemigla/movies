import React from 'react';
import { useSelector } from 'react-redux';
import { KEY } from '../../constants/CONSTANTS';
import style from './style.module.scss';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { Rating } from '../rating/Rating';

export const Tvshow = () => {

    const { ids } = useParams();
    const { data } = useFetch(`/tv/${ids}?api_key=${KEY}`);
    const { url } = useSelector((state) => state?.main);

    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                <img className={style.img ? style.img : null} src={url?.backdrop + data?.backdrop_path} alt={data?.backdrop_path} />
                <span className={style.average}>
                    <Rating rating={Number(data?.vote_average).toFixed(1)} />
                </span>
                <span className={style.title}>{data?.name} {"(" + data?.first_air_date + ")"}</span>
            </div>
            <div className={style.description}>
                {data?.overview?.length ?
                    <div className={style.overview}><i>{data?.overview}</i></div> :
                    (
                        <div className={style.nooverview}><h3>No Overview</h3></div>
                    )}
                <p className={style.country}>Country: {data?.origin_country}</p>
            </div>
        </div>
    );
}
