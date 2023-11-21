import React, { useEffect } from 'react';
import style from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getGenreApi } from '../redux/slices/genresSlice';
import { useParams } from 'react-router-dom';

export const Genres = () => {
    const { ids } = useParams();
    const dispatch = useDispatch();
    const selector = useSelector(state => state?.genres?.genres);

    useEffect(() => {
        try {
            dispatch(getGenreApi(ids));
        } catch (error) {
            console.log(error);
        }
    }, [dispatch, ids])

    return (
        <div className={style.container}>
            {selector?.genres?.map(({ id, name }) => (
                <div key={id} className={style.wrapper}>
                    <span className={style.title}>{name}</span>
                </div>
            ))}
        </div>
    );
}
