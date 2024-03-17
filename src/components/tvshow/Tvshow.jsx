// import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import style from './style.module.scss';
// import { useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { DetailShow } from './DetailShow';
// import { getDetailTvThunk } from '../redux/slices/detailtvSlice';

// export const Tvshow = () => {

//     const { ids } = useParams();
//     const dispatch = useDispatch();
//     const selector = useSelector(state => state?.detailtv?.detailtv);
//     console.log('SELECTOR ', selector);
//     useEffect(() => {
//         try {
//             dispatch(getDetailTvThunk(ids))
//         } catch (error) {
//             console.log(error);
//         }
//     }, [dispatch, ids])

//     return (
//         <div className={style.container}>
//             <DetailShow {...selector} />
//         </div>
//     );
// }
