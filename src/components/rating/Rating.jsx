import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const Rating = ({ rating }) => {
  return (
    <div style={{
      width: "60px", height: "60px", backgroundColor: "white",
      borderRadius: "50%", fontWeight: "bold"
    }} >
      <CircularProgressbar
        value={rating}
        maxValue={10}
        minValue={0}
        text={rating}
        styles={buildStyles({
          pathColor:
            rating < 5 ? "red" : rating < 7 ? "orange" : "green"
        })}
      />
    </div>
  )
}