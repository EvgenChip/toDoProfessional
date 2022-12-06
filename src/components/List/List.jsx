import React from 'react'
import classNames from 'classnames'
import isRemovebleIcon from '../../assets/img/isRemovable.svg'
import axios from "axios";

import "./List.scss";
import Badge from "../Badge/Badge";

const List = ({ items, isRemovable, onClick, onRemove }) => {
  isRemovable = true;

  const removeList = (item) => {
    if (window.confirm("Вы действительно хотите удалить список?")) {
      axios.delete("http://localhost:3001/lists/" + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };

  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, { active: item.active })}>
          <i>
            {item.icon ? (
              <img src={item.icon}></img>
            ) : (
              <Badge color={item.color} />
            )}
          </i>

          <span>{item.name}</span>
          <span>
            {isRemovable && (
              <img
                className="list__remove-icon"
                src={isRemovebleIcon}
                alt="Remove icon"
                onClick={() => {
                  removeList(item);
                }}
              />
            )}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default List