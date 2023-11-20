import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviewsToMovies } from "../../components/redux/slices/reviewsSlice";
import style from './style.module.scss';

export const Comments = () => {
  const { ids } = useParams();

  const dispatch = useDispatch();
  const selector = useSelector(state => state.reviews.reviews);

  useEffect(() => {
    dispatch(getReviewsToMovies(ids))
  }, [dispatch, ids])

  return (
    <div className={style.reviews}>
      <div className={style.reviewsTitle}>Comments ({selector.length})</div>
      {selector.length ? selector?.map((item) => (
        <div key={item.id}>
          <details className={style.detailsReviews}>
            <summary>
              <b className={style.author}>{item.author}</b>
            </summary>
            <i className={style.content}>{item.content}</i>
          </details>
        </div>
      )) : <h3 style={{ color: "white" }}>There are no comments </h3>}
    </div>
  )
}