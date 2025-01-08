import { useUnit } from "effector-react";
import "./TodoList.css";
import {
  addItem,
  removeItem,
  itemsStore,
  fetchItems,
  initItems,
} from "../Store/itemsStore";
import { useState, useEffect } from "react";

const TodoList = () => {
  const items = useUnit(itemsStore);
  const [inputValue, setInputValue] = useState("");

  const handleAddItem = () => {
    if (inputValue.trim()) {
      addItem(inputValue);
      setInputValue("");
    }
  };

  const handleRemoveItem = (index) => {
    removeItem(index);
  };

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("todoItems"));
    if (savedItems && savedItems.length > 0) {
      initItems(savedItems);
    } else {
      fetchItems();
    }
  }, []);

  return (
    <div className="TodoList">
      <div className="TodoList_container">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="TodoList_input"
          type="text"
        />
        <button onClick={handleAddItem} className="TodoList_button_add">
          Добавить
        </button>
      </div>
      <ul className="TodoList_ul">
        {items.map((item, index) => (
          <li key={index} className="TodoList_li">
            <span>{item}</span>
            <button
              onClick={() => handleRemoveItem(index)}
              className="TodoList_button_dlt"
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
