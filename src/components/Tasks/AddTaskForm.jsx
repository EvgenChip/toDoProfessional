import axios from "axios";
import React from "react";
import { useState } from "react";
import addUI from "../../assets/img/addUl.svg";

export const AddTaskForm = ({ list, onAddTask }) => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const toggleFormVisible = () => {
    setVisibleForm(!visibleForm);
    setInputValue("");
  };
  const addTask = () => {
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false,
    };
    axios.post("http://localhost:3001/tasks", obj).then(({ data }) => {
      onAddTask(list.id, data);
      toggleFormVisible();
    });
  };

  console.log(inputValue);

  return (
    <div className="tasks__form">
      {!visibleForm && (
        <div onClick={toggleFormVisible} className="tasks__form_new">
          <img src={addUI} alt="addIcon" />
          <span> Новая задача</span>
        </div>
      )}
      {visibleForm && (
        <div className="tasks__form_active">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Текст задачи"
          />

          <button
            disabled={inputValue.length < 1}
            onClick={addTask}
            className="button">
            Добавить задачу
          </button>
          <button onClick={toggleFormVisible} className="button  button--grey">
            Отмена
          </button>
        </div>
      )}
    </div>
  );
};
