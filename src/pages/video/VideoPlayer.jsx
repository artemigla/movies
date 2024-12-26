import React from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { useFetch } from "../../hooks/useFetch";
import { KEY } from "../../constants/CONSTANTS";
import style from "./style.module.scss";

const opts = {
  width: "100%",

  playerVars: {
    autoplay: 0,
  },
};

export const VideoPlayer = () => {
  const { ids } = useParams();
  const { data } = useFetch(
    `/movie/${ids}?api_key=${KEY}&append_to_response=videos`
  );

  const trailer = data?.videos?.results?.find((item) => {
    return item.name === "Official Trailer";
  });

  return (
    <div className={style.container}>
      {<YouTube className={style.youtube} videoId={trailer?.key} opts={opts} />}
    </div>
  );
};
