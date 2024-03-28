/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ShowCarts } from '../showcarts/ShowCarts';
import { KEY } from '../../constants/CONSTANTS';
import { ThemeContext } from '../../context/ThemeContext';
import style from './style.module.scss';

export const Search = () => {

    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const { query } = useParams();
    const { theme, darkMode } = useContext(ThemeContext);
    const fetchNextPageData = () => {
        setIsLoading(true)
        fetchDataFromApi(`/search/multi?query=${query}&api_key=${KEY}&page=${pageNum}`)
            .then(
                (res) => {
                    if (data?.results) {
                        setData({
                            ...data,
                            results: [...data?.results, ...res?.results],
                        });
                    } else {
                        setData(res);
                    }
                    setPageNum((prev) => prev + 1);
                    setIsLoading(false)
                }
            );
    };

    const fetchInitialData = () => {
        setIsLoading(true);
        fetchDataFromApi(`/search/multi?query=${query}&api_key=${KEY}&page=${pageNum}`)
            .then(
                (res) => {
                    setData(res);
                    setPageNum((prev) => prev + 1);
                    setIsLoading(false);
                }
            );
    }

    useEffect(() => {
        setPageNum(1);
        fetchInitialData();
        setIsLoading(true);
    }, [query]);

    return (
        <div className={style.container}>
            <div className={style.titlequery} style={{color: darkMode ? theme?.dark?.color : theme?.light?.color}}>
                {`Search ${data?.total_results > 1
                    ? "results"
                    : "result"
                    } of '${query}'`}
            </div>
            <InfiniteScroll
                className={style.wrapperdata}
                dataLength={data?.results?.length > 0 || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
            >
                {!isLoading && data?.results?.length ? (
                    <>
                        {data?.results?.map((item, index) => {

                            return <ShowCarts key={index} data={item} />
                        })}
                    </>
                ) : (<div style={{color: darkMode ? theme?.dark?.color : theme?.light?.color}}>No Results</div>)}
            </InfiniteScroll>
        </div>
    )
}
