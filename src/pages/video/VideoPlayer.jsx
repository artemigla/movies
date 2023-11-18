import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import YouTube from 'react-youtube';
import { getVideoThunk } from '../../components/redux/slices/videoSlice';
import style from './style.module.scss';

const opts = {
  height: '420',
  width: '768',
  playerVars: {
    autoplay: 0,
  },
};

export const VideoPlayer = () => {
  const { ids } = useParams();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.video.video);

  useEffect(() => {
    dispatch(getVideoThunk(ids));
  }, [dispatch, ids]);

  const trailer = selector?.videos?.results?.find((item) => {
    return item.name === 'Official Trailer'
  });

  return (
    <div className={style.container}>
      <div className={style.youtubeWrapper}>
        <YouTube
          className={style.youtube}
          videoId={trailer?.key}
          opts={opts}
        />
      </div>
    </div>
  )

}
