import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import YouTube from 'react-youtube';
import { getVideoThunk, setLoading } from '../../components/redux/slices/videoSlice';
import style from './style.module.scss';

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    autoplay: 0,
  },
};

export const VideoPlayer = () => {
  const { ids } = useParams();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.video.video);
  const isSelector = useSelector(state => state.video.isLoading);

  useEffect(() => {
    dispatch(setLoading(isSelector))
  }, [dispatch, isSelector])

  useEffect(() => {
    dispatch(getVideoThunk(ids));
  }, [dispatch, ids]);

  const trailer = selector?.videos?.results?.find((item) => {
    return item.name === 'Official Trailer'
  });

  const includeVideo = () => {
    dispatch(setLoading(!isSelector))
  }

  return (
    <div className={style.container}>
      <div className={style.buttonWrapper}>
        <button onClick={includeVideo}
          className={style.button}
        >Play trailer</button>
      </div>
      {isSelector ?
        <div className={style.youtubeWrapper}>
          <YouTube
            className={style.youtube}
            videoId={trailer?.key}
            opts={opts}
          />
        </div>
        : null}
    </div>
  )

}