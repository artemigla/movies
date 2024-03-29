import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import style from './style.module.scss';

export const Rating = ({ rating }) => {
  return (
    <div className={style.container}>
      <CircularProgressbar
        value={rating}
        maxValue={10}
        minValue={0}
        text={rating}
        styles={buildStyles({
          pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green", textSize: "25px"
        })}
      />
    </div>
  )
}
