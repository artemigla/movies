import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL_IMAGES, KEY } from "../../constants/CONSTANTS";
import { Rating } from "../rating/Rating";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import style from './style.module.scss';
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchDataFromApi } from '../../utils/api';

let filters = {}
export const ShowMovies = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchInitialData = () => {
    setIsLoading(true);
    fetchDataFromApi(`/movie/popular?api_key=${KEY}`, filters).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setIsLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/movie/popular?api_key=${KEY}&page=${pageNum}`, filters)
      .then((res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
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
    }, 1500);
  }, []);

  useEffect(() => {
    filters = {}
    setData(null);
    setPageNum(1);
    fetchInitialData();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.movies}>
        <SkeletonTheme color="#505050" highlightColor="#333">
          {isLoading ? <h4>Movies</h4> : <Skeleton duration={2} className={style.moviesSceleton} />}
        </SkeletonTheme>
      </div>
      <div className={style.wrapper}>
        {<>
            {data?.results.length > 0 ? (
              <InfiniteScroll
                className={style.wrapperdata}
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
              >
                {data?.results?.map(({ id, backdrop_path, title, vote_average }) => {
                  return (
                    <Link to={`/details/${id}`} key={id} className={style.wrappercarts}>
                      <div className={style.carts}>
                        <SkeletonTheme color="#505050" highlightColor="#999">
                          {isLoading ? <img className={style.img} src={`${BASE_URL_IMAGES}${backdrop_path}`} alt="" />
                            : <Skeleton duration={2} className={style.imgsceleton} />
                          }
                        </SkeletonTheme>
                        <div className={style.rating} >
                          <SkeletonTheme color="#505050" highlightColor="#999">
                            {isLoading ?
                              <Rating rating={Number(vote_average).toFixed(1)} /> :
                              <Skeleton duration={2} className={style.skeleton} />}
                          </SkeletonTheme>
                        </div>
                        <SkeletonTheme color="#505050" highlightColor="#999">
                          {isLoading ?
                            <span className={style.title}>{title}</span> :
                            <Skeleton duration={2} className={style.titleSceleton} />}
                        </SkeletonTheme>
                      </div>
                    </Link>
                  )
                })}
              </InfiniteScroll>
            ) : (
              <h3>No results</h3>
            )
            }
          </>}
      </div>
    </div>
  )
}
