import React from 'react';
import { BASE_URL_IMAGES } from '../../constants/CONSTANTS';
import style from './style.module.scss';

export const ShowPerson = ({ name, birthday, place_of_birth, profile_path, known_for_department, biography }) => {

    return (
        <div className={style.wrapper}>
            <div className={style.content}>
                <img className={style.img} src={`${BASE_URL_IMAGES}${profile_path}`} alt={name} />
                <div className={style.biography}>
                    <span className={style.title}>{name}</span>
                    <div className={style.titlebiography}>
                        <span>Biography</span>
                    </div>
                    <p>{biography}</p>
                    <div className={style.department}>
                        <span>{known_for_department}</span>
                    </div>
                    <div className={style.placeofbirth}>
                        <h4>Place of birth</h4>
                        <span>{place_of_birth} </span>
                        <p>{birthday}</p>
                    </div>
                    
                </div>
            </div>

        </div>
    );
}