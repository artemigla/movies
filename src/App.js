import React from "react";
import { Header } from "./components/header/Header";
import { Movie } from "./components/content/Movie";
import { Outlet, Route, Routes } from "react-router-dom";
import { Details } from "./pages/details/Details";
import style from './style.module.scss';
import { ShowMovies } from "./components/showcontent/ShowMovies";
import { Person } from "./pages/person/Person";
import { Tvshow } from "./components/tvshow/Tvshow";

export const App = () => {
  return (
    <div className={style.container}>
      <Header />
      <Routes>
        <Route path="/" element={<Movie />} />
        <Route path="details/:ids" element={<Details />} />
        <Route path="showcontent/" element={<ShowMovies />} />
        <Route path="person/:ids" element={<Person/>}/>
        <Route path="tvshow/:ids" element={<Tvshow/>}/>
      </Routes>
      <Outlet />
    </div>
  );
}
