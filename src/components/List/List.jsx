import React from 'react'
import classNames from 'classnames'
import isRemovebleIcon from '../../assets/img/isRemovable.svg'

import './List.scss'
import Badge from '../Badge/Badge'



const List = ({ items, isRemovable, onClick, onRemove }) => {
    isRemovable = true
    return (
        <ul onClick={onClick} className='list'>
            {items.map((item, index) => (
                <li key={index} className={classNames(item.className, { 'active': item.active })}>
                    <i>

                        {item.icon
                            ? (<img src={item.icon}></img>)
                            : (<Badge color={item.color} />)}
                    </i>

                    <span>{item.name}</span>
                    <span>{isRemovable && (
                        <img
                            className='list__remove-icon'
                            src={isRemovebleIcon} alt=""
                            onClick={() => { onRemove(item) }}
                        />)
                    }

                    </span>

                </li>

            ))}
        </ul>
    )

}

export default List