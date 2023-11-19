export const BASE_URL_IMAGES = 'https://image.tmdb.org/t/p/w780/';
export const BASE_URL = 'https://api.themoviedb.org/3/';
export const BASE_URL_SEARCH = 'https://api.themoviedb.org/3/search/movie?query='
export const PAGE = 1;
export const KEY = 'c8b12b87395ea395f7a50b6f6f398e58';

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
    }
  ]
};

