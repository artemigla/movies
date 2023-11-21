import React from 'react';
import { BASE_URL_IMAGES } from '../../constants/CONSTANTS';
import style from './style.module.scss';

export const ShowPerson = ({ name, place_of_birth, profile_path, known_for_department, biography }) => {

    return (
        <div className={style.wrapper}>
            <div className={style.content}>
                <img className={style.img} src={`${BASE_URL_IMAGES}${profile_path}`} alt={name} />
                <div className={style.biography}>
                    <span className={style.title}>{name}</span>
                    <p>{biography}</p>
                    <div>
                        <span>{known_for_department}</span>
                    </div>
                    <div>
                        <span>{place_of_birth}</span>
                    </div>
                </div>
            </div>

        </div>
    );
}