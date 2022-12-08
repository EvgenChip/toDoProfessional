import React from "react";
import "./Tasks.scss";
import panIcon from "../../assets/img/pain.svg";
import okTask from "../../assets/img/okTask.svg";

import axios from "axios";
import { AddTaskForm } from "./AddTaskForm";

const Tasks = ({ list, onEditTitle, onAddTask }) => {
  const editTitle = () => {
    const newTitle = window.prompt("Название списка", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch("http://localhost:3001/lists/" + list.id, {
          name: newTitle,
        })
        .catch(() => {
          alert("что то не так");
        });
    }
  };
  return (
    <div className="tasks">
      <h2 className="tasks__title">
        {list.name}
        <img onClick={editTitle} src={panIcon} alt="edit icon" />
      </h2>
      <div className="tasks__items">
        {!list.tasks.length && <h2>Задачи отсутствуют</h2>}
        {list.tasks.map((task) => (
          <div key={task.id} className="tasks__items-row">
            <div className="checkbox">
              <input id={`task${task.id}`} type="checkbox" />
              <label htmlFor={`task${task.id}`}>
                <img src={okTask} alt="" />
              </label>
            </div>
            <p>{task.text}</p>
          </div>
        ))}
        <AddTaskForm list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;
