import React, { useState } from "react";
import List from "../List/List";
import addUl from "../../assets/img/addUl.svg";
import addCancel from "../../assets/img/add-list__cancel.svg";
import axios from "axios";
import "./AddButtonList.scss";
import Badge from "../Badge/Badge";
import { useEffect } from "react";

const AddButtonList = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, setSelectedColor] = useState(3);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue("");
    setSelectedColor();
  };

  const addList = () => {
    if (!inputValue) {
      alert("Введите название списка");
      return;
    }

    axios
      .post("http://localhost:3001/lists", {
        name: inputValue,
        colorId: selectedColor,
      })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === selectedColor)[0].name;
        const listObj = { ...data, color: { name: color } };
        onAdd(listObj);
        onClose();
      });
  };

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(true)}
        items={[
          {
            className: "icon__add-button",
            icon: addUl,
            name: "Добавить список",
          },
        ]}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <button onClick={() => onClose()} className="add-list__cancel">
            <img src={addCancel} />
          </button>

          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Название списка"
          />

          <div className="add-list__popup-color">
            {colors.map((color) => (
              <Badge
                onClick={() => setSelectedColor(color.id)}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && "active"}
              />
            ))}
          </div>
          <button onClick={addList} className="button">
            Добавить
          </button>
        </div>
      )}
    </div>
  );
};

export default AddButtonList;
