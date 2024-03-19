import React, { useEffect } from "react";
import { Header } from "./components/header/Header";
import { Movie } from "./components/content/Movie";
import { Outlet, Route, Routes } from "react-router-dom";
import { Details } from "./pages/details/Details";
import { ShowMovies } from "./components/showcontent/ShowMovies";
import { Person } from "./pages/person/Person";
import { Tvshow } from "./components/tvshow/Tvshow";
import { Tvshowcontent } from "./components/tvshow/listtv/AllListTV";
import { Search } from "./components/search/Search";
import { useDispatch } from 'react-redux';
import { fetchDataFromApi } from './utils/api';
import { getApiConfiguration } from "./components/redux/slices/mainSlice";
import { KEY } from "./constants/CONSTANTS";
import style from './style.module.scss';

export const App = () => {

  const dispatch = useDispatch();

  const fetchApiConfig = () => {
    fetchDataFromApi(`/configuration?api_key=${KEY}`)
      .then((res) => {
        const url = {
          backdrop: res?.images?.secure_base_url + "original",
          poster: res?.images?.secure_base_url + "original",
          profile: res?.images?.secure_base_url + "original",
        };

        dispatch(getApiConfiguration(url));
      });
  };

  useEffect(() => {
    fetchApiConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.container}>
      <Header />
      <Routes>
        <Route path="/" element={<Movie />} />
        <Route path="search/:query" element={<Search />} />
        <Route path="details/:ids" element={<Details />} />
        <Route path="showcontent/" element={<ShowMovies />} />
        <Route path="person/:ids" element={<Person />} />
        <Route path="tvshow/:ids" element={<Tvshow />} />
        <Route path="tvshowcontent/" element={<Tvshowcontent />} />
      </Routes>
      <Outlet />
    </div>
  );
}
