import React from 'react'
import classNames from 'classnames'

import './Badge.scss'
import db from '../../assets/db.json'

const Badge = ({ color, onClick, className }) => {
    console.log(color)


    return (

        <i onClick={onClick} className={classNames('badge', { [`badge--${color}`]: color }, className)}></i>


    )
}

export default Badge