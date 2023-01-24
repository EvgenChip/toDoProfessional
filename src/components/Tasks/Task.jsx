import React from "react";
import okTask from "../../assets/img/okTask.svg";
import panIcon from "../../assets/img/pain.svg";
import isRemovebleIcon from "../../assets/img/isRemovable.svg";
export const Task = ({ id, text, onRemoveTask, list, onEdit }) => {
  return (
    <div key={id} className="tasks__items-row">
      <div className="checkbox">
        <input id={`task${id}`} type="checkbox" />
        <label htmlFor={`task${id}`}>
          <img src={okTask} alt="" />
        </label>
      </div>
      <input readOnly value={text} />
      <div className="tasks__items-row-actions">
        <img src={panIcon} alt="edit icon" />

        <img
          onClick={() => onRemoveTask(list.id, id)}
          src={isRemovebleIcon}
          alt=""
        />
      </div>
    </div>
  );
};
