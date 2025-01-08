import { createStore, createEvent, createEffect } from "effector";

export const addItem = createEvent();
export const removeItem = createEvent();
export const initItems = createEvent();

export const fetchItems = createEffect(async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["Пример задачи 1", "Пример задачи 2", "Пример задачи 3"]);
    }, 1000);
  });
});

const saveToLocalStorage = (items) => {
  localStorage.setItem("todoItems", JSON.stringify(items));
};

export const itemsStore = createStore(
  JSON.parse(localStorage.getItem("todoItems")) || []
)
  .on(addItem, (state, item) => {
    const newState = [...state, item];
    saveToLocalStorage(newState);
    return newState;
  })
  .on(removeItem, (state, index) => {
    const newState = state.filter((_, i) => i !== index);
    saveToLocalStorage(newState);
    return newState;
  })
  .on(fetchItems.doneData, (_, items) => {
    saveToLocalStorage(items);
    return items;
  })
  .on(initItems, (_, items) => {
    saveToLocalStorage(items);
    return items;
  });
