import React from "react";
import { Header } from "./components/header/Header";
import { Movie } from "./components/content/Movie";
import { Outlet, Route, Routes } from "react-router-dom";
import { Details } from "./pages/details/Details";
import style from './style.module.scss';

export const App = () => {
  return (
    <div className={style.container}>
      <Header />
      <Routes>
        <Route path="/" element={<Movie />} />
        <Route path="details/:ids" element={<Details />} />
      </Routes>
      <Outlet />
    </div>
  );
}
