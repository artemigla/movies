import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDetailMovie } from '../../components/redux/slices/detailSlice';
import { ShowDetail } from './ShowDetail.jsx';
import style from './style.module.scss';

export const Details = () => {
  const { ids } = useParams()

  const dispatch = useDispatch();
  const selectorDetail = useSelector(state => state.detail.detail);

  useEffect(() => {
    dispatch(getDetailMovie(ids))
    window.scroll(0, 0)
  }, [dispatch, ids])

  return (
    <div className={style.container}>
      <ShowDetail {...selectorDetail} />
    </div>
  )
}