/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ShowCarts } from '../showcarts/ShowCarts';
import { KEY } from '../../constants/CONSTANTS';

export const Search = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const { query } = useParams();

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
        <InfiniteScroll
            dataLength={data?.results?.length > 0 || []}
            next={fetchNextPageData}
            hasMore={pageNum <= data?.total_pages}
        >
            {!isLoading && data?.results?.map((item, index) => (
                <ShowCarts
                    key={index}
                    fromSearch={true}
                    data={item}
                />
            ))}
        </InfiniteScroll>
    )
}
