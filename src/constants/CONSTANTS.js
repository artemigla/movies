export const BASE_URL_IMAGES = 'https://image.tmdb.org/t/p/w780/';
export const BASE_URL = 'https://api.themoviedb.org/3';
export const BASE_URL_SEARCH = 'https://api.themoviedb.org/3/search/movie?query='
export const PAGE = 1;
export const TMDB_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTk2YTliNWY0NmM2ZGExOGQ3YjkxMzdkMDdhM2YxZCIsIm5iZiI6MTcyOTQ1MzMxNy42OTQ2NDQsInN1YiI6IjYxNTFiOWU1OTk3NGVlMDAyNjIxNWVhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DQfptdkByGokBzsqwR8z0BR_4Rpwgnu4fyaCGsuYweo';
export const KEY = 'd196a9b5f46c6da18d7b9137d07a3f1d';

export const SETTINGS = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 9,
  slidesToScroll: 2,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 5,
      }
    },
    {
      breakpoint: 720,
      settings: {
        slidesToShow: 4,
      }
    },
    {
      breakpoint: 412,
      settings: {
        slidesToShow: 2,
        sinitialSlide: 2,
      }
    },

    {
      breakpoint: 360,
      settings: {
        slidesToShow: 2,
        sinitialSlide: 2,
      }
    },
    {
      breakpoint: 300,
      settings: {
        slidesToShow: 2,
        sinitialSlide: 2,
      }
    }
  ]
};

