import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { KEY } from "../../constants/CONSTANTS";
import { useFetch } from '../../hooks/useFetch';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import style from './style.module.scss';

export const Comments = () => {
  const { ids } = useParams();
  const { data } = useFetch(`/movie/${ids}/reviews?api_key=${KEY}`);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true)
    }, 700)
  }, [isLoading])

  return (
    <div className={style.reviews}>
      <SkeletonTheme color="#505050" highlightColor="#999">
        {isLoading ? <div className={style.reviewsTitle}>Comments ({data?.results?.length})</div> : <Skeleton duration={2} className={style.reviewsTitle} />}
      </SkeletonTheme>
      {data?.results?.length ? data?.results?.map((item) => (
        <div key={item.id}>
          <details className={style.detailsReviews}>
            <SkeletonTheme color="#505050" highlightColor="#999">
              <summary>
                {isLoading ? <b className={style.author}>{item.author}</b> : <Skeleton duration={2} className={style.author} />}
              </summary>
            </SkeletonTheme>
            <i className={style.content}>{item.content}</i>
          </details>
        </div>
      )) : <SkeletonTheme color="#505050" highlightColor="#999">
        {isLoading ? <h3 style={{ color: "white" }}>There are no comments </h3> : <Skeleton duration={2} style={{ width: "250px" }} />}
      </SkeletonTheme>}
    </div>
  )
}