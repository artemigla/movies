import React, { useEffect, useState, useContext } from 'react';
import { KEY, BASE_URL_IMAGES } from '../../constants/CONSTANTS';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { Rating } from '../rating/Rating';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ThemeContext } from '../../context/ThemeContext';
import style from './style.module.scss';

export const Tvshow = () => {
    window.scroll(0, 0);
    const { ids } = useParams();
    const { data } = useFetch(`/tv/${ids}?api_key=${KEY}`);
    const [isLoading, setIsLoading] = useState(false);
    const { theme, darkMode } = useContext(ThemeContext);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true)
        }, 700)
    }, [])

    return (
        <div className={style.container}>
            <SkeletonTheme color="#505050" highlightColor="#999">
                <div className={style.wrapper}>
                    {isLoading ?
                        <img className={style.img ? style.img : null} src={BASE_URL_IMAGES + data?.poster_path} alt={data?.backdrop_path} />
                        : <Skeleton duration={2} className={style.img} />
                    }
                    <span className={style.average}>
                        {isLoading ? <Rating rating={Number(data?.vote_average).toFixed(1)} /> : <Skeleton duration={2} className={style.skeletonaverage} />}
                    </span>
                    {isLoading ? <span className={style.title} style={{ color: darkMode ? theme?.dark?.color : theme?.light?.color}}>{data?.name} {"(" + data?.first_air_date + ")"}</span> : <Skeleton duration={2} />}
                </div>
                <div className={style.description}>
                    {data?.overview?.length ?
                        <div className={style.overview} style={{ color: darkMode ? theme?.dark?.color : theme?.light?.color}}>{isLoading ? <i>{data?.overview}</i> : <Skeleton duration={2} />}</div> :
                        (
                            <div className={style.nooverview} style={{ color: darkMode ? theme?.dark?.color : theme?.light?.color}}>{isLoading ? <h3>No Overview</h3> : <Skeleton duration={2} />}</div>
                        )}
                    {isLoading ? <p className={style.country} style={{ color: darkMode ? theme?.dark?.color : theme?.light?.color}}>Country: {data?.origin_country}</p> : <Skeleton duration={2} />}
                </div>
            </SkeletonTheme>
        </div>
    );
}
