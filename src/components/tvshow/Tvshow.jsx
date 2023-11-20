import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import { BASE_URL_IMAGES, SETTINGS } from '../../constants/CONSTANTS';
import style from './style.module.scss';
import { getTvShow } from '../redux/slices/tvSlice';
import { useDispatch } from 'react-redux';
import { Rating } from '../rating/Rating';

export const Tvshow = () => {

    const dispatch = useDispatch();
    const selector = useSelector(state => state?.tvshow?.tvshow);
    console.log(selector);

    useEffect(() => {
        try {
            dispatch(getTvShow())
        } catch (error) {
            console.log(error)
        }
    }, [dispatch])

    return (
        <div className={style.container}>
            <div className={style.wrappercontainer}>
                <span className={style.title}>Tv show</span>
                <Slider {...SETTINGS} className={style.slider}>
                    {selector.map(({ id, original_name, backdrop_path, vote_average }) => (
                        <div key={id} className={style.wrapper}>
                            <div className={style.imgwrapper}>
                                <img className={style.img ? style.noimg : style.img} src={`${BASE_URL_IMAGES}${backdrop_path}`} alt={''} />
                                <span className={style.average}>
                                    <Rating rating={Number(vote_average).toFixed(1)} />
                                </span>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
