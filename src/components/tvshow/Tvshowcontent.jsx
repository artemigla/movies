import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL_IMAGES } from '../../constants/CONSTANTS';
import { Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { getTvShow } from '../redux/slices/tvSlice';
import style from './style.module.scss';

export const Tvshowcontent = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state.tvshow.tvshow);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, [])

    useEffect(() => {
        try {
            dispatch(getTvShow());
        } catch (error) {
            console.log(error)
        }
    }, [dispatch]);

    return (
        <div className={style.containertv}>
            {selector.map((item) => (
                <Link to={`/tvshow/${item.id}`} key={item.id} className={style.wrapper}>
                    <div className={style.wrapperimg}>
                        <SkeletonTheme color="#505050" highlightColor="#999">
                            {!isLoading ? <img className={style.img} src={`${BASE_URL_IMAGES}${item?.backdrop_path}`} alt={item.name} />
                                : <Skeleton duration={2} className={style.img} />
                            }
                        </SkeletonTheme>
                        <SkeletonTheme color="#505050" highlightColor="#999">
                            {!isLoading ? <h4 className={style.title}>{item?.name}</h4>
                                : <Skeleton duration={2} className={style.titleSceleton} />
                            }
                        </SkeletonTheme>
                    </div>
                </Link>
            ))}
        </div>
    );
}