import React from 'react'
import classNames from 'classnames'
import isRemovebleIcon from '../../assets/img/isRemovable.svg'
import axios from "axios";

import "./List.scss";
import Badge from "../Badge/Badge";

const List = ({
  items,
  isRemovable,
  onClick,
  onRemove,
  onClickItem,
  activeItem,
}) => {
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
          onClick={onClickItem ? () => onClickItem(item) : null}
          key={index}
          className={classNames(item.className, {
            active: activeItem && activeItem.id === item.id,
          })}>
          <i>
            {item.icon ? (
              <img src={item.icon}></img>
            ) : (
              <Badge color={item.color} />
            )}
          </i>

          <span>
            {item.name}
            {item.tasks && `(${item.tasks.length})`}
          </span>
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