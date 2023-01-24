import React from "react";
import "./Tasks.scss";
import panIcon from "../../assets/img/pain.svg";


import axios from "axios";
import { AddTaskForm } from "./AddTaskForm";
import { Task } from "./Task";

const Tasks = ({
  list,
  onEditTitle,
  onAddTask,
  onRemoveTask,
  withoutEmpty,
}) => {
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
      <h2 style={{ color: list.color.hex }} className="tasks__title">
        {list.name}
        <img onClick={editTitle} src={panIcon} alt="edit icon" />
      </h2>
      <div className="tasks__items">
        {!withoutEmpty && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
        {list.tasks.map((task) => (
          <Task
            list={list}
            onRemoveTask={onRemoveTask}
            key={task.id}
            {...task}
          />
        ))}
        <AddTaskForm list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;
