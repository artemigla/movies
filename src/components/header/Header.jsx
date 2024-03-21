import React, { useEffect, useState } from "react";
import style from './styles.module.scss';
import { RxAvatar } from 'react-icons/rx';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setTitle("Live movie")
    }, 700)
  }, []);

  const handlerInput = (event) => {
    setSearch(event.target.value);
  }

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && search.trim("").length > 0) {
      navigate(`/search/${search}`);
      setSearch('');
    }

  };

  return (
    <header className={style.container}>
      <div className={style.wrapper}>
        <div className={style.title}>
          <SkeletonTheme color="#202020" highlightColor="#444">
            <h3>{title || <Skeleton duration={2} />}</h3>
          </SkeletonTheme>
        </div>
        <div className={style.search}>
          <SkeletonTheme color="#202020" highlightColor="#444">
            {!isLoading ?
              <>
                <input type="search"
                  value={search}
                  onInput={handlerInput}
                  onKeyUp={searchQueryHandler}
                  placeholder="Search..." />
              </>
              : <Skeleton duration={2} className={style.skeleton} />}
          </SkeletonTheme>
        </div>
        <SkeletonTheme color="#202020" highlightColor="#444">
          {!isLoading ? <RxAvatar className={style.avatar} /> : <Skeleton className={style.avatar} duration={2} />}
        </SkeletonTheme>
      </div>
    </header>
  )
}
