import React from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL_IMAGES } from '../../constants/CONSTANTS';
import { Link } from 'react-router-dom';
import style from './style.module.scss';
export const Tvshowcontent = () => {

    const selector = useSelector(state => state?.tvshow?.tvshow);

    return (
        <div className={style.containertv}>
            {selector.map((item) => (
                <Link to={`/tvshow/${item.id}`} key={item.id} className={style.wrapper}>
                    <div className={style.wrapperimg}>
                        <img className={style.img} src={`${BASE_URL_IMAGES}${item.poster_path}`} alt={item.name} />
                        <h4 className={style.title}>{item.name}</h4>
                    </div>
                </Link>
            ))}
        </div>
    );
}