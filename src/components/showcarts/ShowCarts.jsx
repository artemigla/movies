import React from 'react'
import { BASE_URL_IMAGES } from '../../constants/CONSTANTS';

export const ShowCarts = ({ fromSearch, data }) => {
    return (
        <div>
            {fromSearch && (
                <div>
                    <img src={BASE_URL_IMAGES + data?.backdrop_path} alt={data?.name} />
                    <p style={{color: "white"}}>{data?.name}</p>
                </div>
            )}
        </div>
    )
}
