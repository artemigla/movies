import React, { useEffect, useState, useContext } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import ReactSwitch from 'react-switch';
import style from './styles.module.scss';

export const Header = () => {
  const { theme, darkMode, setDarkMode } = useContext(ThemeContext);
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

  const handleChange = () => {
    setDarkMode(!darkMode)
  }

  return (
    <header className={style.container}
      style={{
        background: darkMode ? theme?.dark?.background : theme?.light?.background,
        color: darkMode ? theme?.dark?.color : theme?.light?.color
      }}>
      <div className={style.wrapper}>
        <div className={style.title} style={{ color: darkMode ? theme?.dark?.color : theme?.light?.color }}>
          <SkeletonTheme color="#202020" highlightColor="#444">
            <h3 style={{ color: darkMode ? theme?.dark?.color : theme?.light?.color }}>{title || <Skeleton duration={2} />}</h3>
          </SkeletonTheme>
        </div>
        <div className={style.flexbox}>
          <SkeletonTheme color="#202020" highlightColor="#444">
            {!isLoading ?
              <div className={style.searchcontainer}>
                {(
                  <div>
                    <input type="text"
                      style={{
                        background: !darkMode ? theme?.dark?.background : theme?.light?.background,
                        color: !darkMode ? theme?.dark?.color : theme?.light?.color
                      }}
                      value={search}
                      onInput={handlerInput}
                      onKeyUp={searchQueryHandler}
                      placeholder="Search..." />
                  </div>
                )}
              </div>
              : <Skeleton duration={2} className={style.skeleton} />}
          </SkeletonTheme>

        </div>
        <SkeletonTheme color="#202020" highlightColor="#444">
          <div className={style.rigthcontent}>
            <div className={style.changetheme}>
              <ReactSwitch
                onChange={handleChange}
                checked={darkMode}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={17}
                uncheckedIcon={false}
                checkedIcon={false}
                height={15}
                width={35}
              />
            </div>
          </div>
        </SkeletonTheme>
      </div>
    </header>
  )
}
