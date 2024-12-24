import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BASE_URL_IMAGES, KEY } from "../../constants/CONSTANTS";
import { Rating } from "../rating/Rating";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchDataFromApi } from '../../utils/api';
import { ThemeContext } from "../../context/ThemeContext";
import style from './style.module.scss';

export const ShowMovies = () => {
  const { theme, darkMode } = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchInitialData = () => {
    setIsLoading(true);
    fetchDataFromApi(`/movie/popular?api_key=${KEY}`).then((res) => {      
      setData(res);
      setPageNum((prev) => prev + 1);
      setIsLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/movie/popular?api_key=${KEY}&page=${pageNum}`)
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
    }, 700)
  }, [])

  useEffect(() => {
    setData(null);
    setPageNum(1);
    fetchInitialData();
  }, []);

  return (
    <div className={style.container} style={{
      background: darkMode ? theme?.dark?.background : theme?.light?.background,
      color: darkMode ? theme?.dark?.color : theme?.light?.color
    }}>
      <div className={style.movies}>
        <SkeletonTheme color="#505050" highlightColor="#333">
          {isLoading ? <h4 style={{ color: darkMode ? theme?.dark?.color : theme?.light?.color }}>Movies</h4> : <Skeleton duration={2} className={style.moviesSceleton} />}
        </SkeletonTheme>
      </div>
      <div className={style.wrapper}>
        {data?.results?.length > 0 ? (
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
                      <div>
                        <SkeletonTheme color="#505050" highlightColor="#999">
                          {isLoading ?
                            <Rating rating={Number(vote_average).toFixed(1)} /> :
                            <Skeleton duration={2} className={style.skeleton} />}
                        </SkeletonTheme>
                      </div>
                      <SkeletonTheme color="#505050" highlightColor="#999">
                        {isLoading ?
                          <div className={style.title}>
                            <span style={{ color: darkMode ? theme?.dark?.color : theme?.light?.color }}>{title?.slice(0, 16)}</span>
                          </div> :
                          <Skeleton duration={2} className={style.titleSceleton} />}
                      </SkeletonTheme>
                    </div>
                  </Link>
                )
              })}
            </InfiniteScroll>
          ) : (
            <h3 style={{ color: darkMode ? theme?.dark?.color : theme?.light?.color }}>No results</h3>
          )} 
      </div>
    </div>
  )
}
