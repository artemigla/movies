import React from 'react'
import { Link } from 'react-router-dom';
import { Rating } from '../rating/Rating';
import NoPoster from '../../assets/noposter.jpg';
import { useSelector } from 'react-redux';
import style from './style.module.scss';

export const ShowCarts = ({ data }) => {
    const { url } = useSelector(state => state?.main);
    const posterUrl = data?.poster_path ? url?.poster + data?.poster_path : NoPoster;

    return (
        <Link to={`/details/${data?.id}`} key={data?.id} className={style.wrapper}>
            <div className={style.index}>
                <img className={style.img} src={posterUrl} alt="" />
            </div>
            <div className={style.rating} >
                <Rating rating={Number(data?.vote_average).toFixed(1)} />
            </div>
            <span className={style.title}>{data?.title}</span>
        </Link>
    )
}
