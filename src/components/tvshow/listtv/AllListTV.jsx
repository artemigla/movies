import React, { useState, useEffect, useContext } from 'react';
import { BASE_URL_IMAGES, KEY } from '../../../constants/CONSTANTS';
import { Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchDataFromApi } from '../../../utils/api';
import { ThemeContext } from '../../../context/ThemeContext';
import style from './style.module.scss';

export const Tvshowcontent = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const { theme, darkMode } = useContext(ThemeContext);

    const fetchInitialData = () => {
        setIsLoading(true);
        fetchDataFromApi(`/discover/tv?api_key=${KEY}`).then((res) => {
            setData(res);
            setPageNum((prev) => prev + 1);
            setIsLoading(false);
        });
    };

    const fetchNextPageData = () => {
        fetchDataFromApi(`/discover/tv?api_key=${KEY}&page=${pageNum}`)
            .then((res) => {
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...data?.results, ...res?.results],
                    });
                } else {
                    setData(res);
                }
                setPageNum((prev) => prev + 1);
            });
    };

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true);
        }, 700);
    }, []);

    useEffect(() => {
        setData(null);
        setPageNum(1);
        fetchInitialData();
    }, []);

    return (
        <div className={style.containertv}>
            {
                <>
                    {data?.results?.length ? (
                        <InfiniteScroll
                            className={style.wrapperdata}
                            dataLength={data?.results.length || []}
                            next={fetchNextPageData}
                            hasMore={pageNum <= data?.total_pages}
                        >
                            {data?.results?.map((item) => (
                                <Link to={`/tvshow/${item.id}`} key={item.id} className={style.wrapper}>
                                    <div className={style.wrapperimg}>
                                        <SkeletonTheme color="#505050" highlightColor="#999">
                                            {isLoading ? <img className={style.img} src={`${BASE_URL_IMAGES}${item?.backdrop_path}`} alt={item.name} />
                                                : <Skeleton duration={2} className={style.img} />
                                            }
                                        </SkeletonTheme>
                                        <SkeletonTheme color="#505050" highlightColor="#999">
                                            {isLoading ? <h4 className={style.title}
                                                style={{ color: darkMode ? theme?.dark?.color : theme?.light?.color }}>
                                                {item?.name.slice(0, 15)}</h4>
                                                : <Skeleton duration={2} className={style.titleSceleton} />
                                            }
                                        </SkeletonTheme>
                                    </div>
                                </Link>
                            ))}
                        </InfiniteScroll>) : (
                        <h3>No results</h3>
                    )}
                </>
            }
        </div>
    );
}