import React, { useState, useEffect } from "react";

import listSvg from "./assets/img/sidebarMenu.svg";
import "./App.css";
import axios from "axios";
import { List, AddButtonList, Tasks } from "./components";

function App() {
  const [lists, setLists] = useState([]);
  const [colors, setColors] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/lists?_expand=color").then(({ data }) => {
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
        <List
          items={lists}
          onRemove={(id) => {
            const newList = lists.filter((item) => item.id !== id);
            setLists(newList);
          }}
          isRemovable
        />

        <AddButtonList colors={colors} onAdd={onAddList} />
      </div>

      <div div className="todo__tasks">
        <Tasks />
      </div>
    </div>
  );
}

export default App;
