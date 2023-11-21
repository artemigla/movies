import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPersonApi } from '../../components/redux/slices/personSlice';
import { ShowPerson } from './ShowPerson';
import style from './style.module.scss';

export const Person = () => {
    const {ids} = useParams();
    const selector = useSelector(state => state.person.person);
    const dispatch = useDispatch();
    
    useEffect(() => {
        try {
            dispatch(getPersonApi(ids))
            window.scroll(0, 0)
        } catch (error) {
            console.log(error);
        }
    }, [dispatch, ids])

    return (
        <div className={style.container}>
            <ShowPerson {...selector}/>
        </div>
    );
}
