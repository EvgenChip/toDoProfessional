import React, { useState, useEffect } from "react";

import listSvg from "./assets/img/sidebarMenu.svg";
import "./App.css";
import axios from "axios";
import { List, AddButtonList, Tasks } from "./components";

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/lists?_expand=color&_embed=tasks")
      .then(({ data }) => {
        setLists(data);
      });
    axios.get("http://localhost:3001/colors").then(({ data }) => {
      setColors(data);
    });
  }, []);

  const onAddList = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  };
  const onAddTask = (listId, taskObj) => {
    const newList = lists.map((i) => {
      if (i.id === listId) {
        i.tasks = [...i.tasks, taskObj];
      }
      return i;
    });
    setLists(newList);
  };

  const onEditListTitle = (id, title) => {
    const newList = lists.map((i) => {
      if (i.id === id) {
        i.name = title;
      }
      return i;
    });
    setLists(newList);
  };

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          items={[
            {
              icon: listSvg,
              name: "Все задачи",
            },
          ]}
        />
        {lists ? (
          <List
            items={lists}
            onRemove={(id) => {
              const newList = lists.filter((item) => item.id !== id);
              setLists(newList);
            }}
            onClickItem={(item) => {
              setActiveItem(item);
              activeItem = { activeItem };
            }}
            isRemovable
          />
        ) : (
          "Загрузка"
        )}

        <AddButtonList colors={colors} onAdd={onAddList} />
      </div>

      <div div className="todo__tasks">
        {lists && activeItem && (
          <Tasks
            list={activeItem}
            onAddTask={onAddTask}
            onEditTitle={onEditListTitle}
          />
        )}
      </div>
    </div>
  );
}

export default App;
