import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL_SEARCH, KEY } from "../../constants/CONSTANTS";
import { getMoviesApi, setMovies } from "../redux/slices/moviesSlice";
import style from './styles.module.scss';
import { RxAvatar } from 'react-icons/rx';

export const Header = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch()

  const handlerInput = (event) => {
    setSearch(event.target.value);
  }

  useEffect(() => {
    try {
      dispatch(getMoviesApi())

    } catch (error) {

    }
  }, [dispatch])

  const handlerButton = async () => {
    if (search.length) {
      const response = await axios.get(`${BASE_URL_SEARCH}${search}&api_key=${KEY}`)
      dispatch(setMovies(response.data.results))
      setSearch('');
    }
  }

  return (
    <header className={style.container}>
      <div className={style.wrapper}>
        <div className={style.title}>
          <h3>Live Movie</h3>
        </div>
        <div className={style.search}>
          <input type="search"
            value={search}
            onInput={handlerInput}
            placeholder="Search..." />
          <div className={style.clicksearch} onClick={() => handlerButton()}>
            <svg className={style.icon} focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
          </div>
        </div>
        <RxAvatar className={style.avatar} />
      </div>
    </header>
  )
}
