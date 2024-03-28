import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL_IMAGES, KEY } from '../../constants/CONSTANTS';
import { useFetch } from '../../hooks/useFetch';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ThemeContext } from '../../context/ThemeContext';
import style from './style.module.scss';

export const Person = () => {
    window.scroll(0, 0);
    const { ids } = useParams();
    const { data } = useFetch(`/person/${ids}?api_key=${KEY}`);
    const [isLoading, setIsLoading] = useState(false);
    const { theme, darkMode } = useContext(ThemeContext);
    
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true);
        }, 700)
    }, [isLoading])

    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                <div className={style.content}>
                    <SkeletonTheme color="#505050" highlightColor="#999">
                        {isLoading ? <img className={style.img} src={`${BASE_URL_IMAGES}` + data?.profile_path} alt={data?.name} /> :
                            <Skeleton duration={2} className={style.img} />}
                    </SkeletonTheme>
                    <div className={style.biography} style={{
                        background: darkMode ? theme?.dark?.background : theme?.light?.background,
                        color: darkMode ? theme?.dark?.color : theme?.light?.color
                    }}>
                        <SkeletonTheme color="#505050" highlightColor="#999">
                            {isLoading ? <span className={style.title}>{data?.name}</span> : <Skeleton duration={2} className={style.title} />}
                            {isLoading ? <div className={style.titlebiography}>
                                <span>Biography</span>
                            </div> : <Skeleton duration={2} className={style.titlebiography} />}
                            {isLoading ? <p>{data?.biography}</p> : <Skeleton duration={2} />}
                        </SkeletonTheme>
                        <SkeletonTheme color="#505050" highlightColor="#999">
                            <div className={style.department}>
                                {isLoading ? <span>{data?.known_for_department}</span> : <Skeleton duration={2} />}
                            </div>
                            <div className={style.placeofbirth}>
                                {isLoading ? <h4>Place of birth</h4> : <Skeleton duration={2} />}
                                {isLoading ? <span>{data?.place_of_birth} </span> : <Skeleton duration={2} />}
                                {isLoading ? <p>{data?.birthday}</p> : <Skeleton duration={2} />}
                            </div>
                        </SkeletonTheme>
                    </div>
                </div>
            </div>

        </div>
    );
}
