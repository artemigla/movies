import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesApi } from '../redux/slices/moviesSlice.js';
import { ShowMovies } from './ShowMovies.jsx';
import style from './style.module.scss';

export const Movie = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state.movies.movies);

  useEffect(() => {
    try {
      dispatch(getMoviesApi())
    } catch (err) {
      console.log(err)
    }
  }, [dispatch])
  return (
    <main className={style.container}>
      <div className={style.wrapper}>
        {selector.map((item) => <ShowMovies key={item.id} {...item} />)}
      </div>
    </main>
  )
}