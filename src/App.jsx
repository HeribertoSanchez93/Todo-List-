import { DragDropContext } from "@hello-pangea/dnd";
import { list } from "postcss";
import React, { useEffect, useState } from "react";
import Header from "./componets/Header";
import TodoComputed from "./componets/TodoComputed";
import TodoCreate from "./componets/TodoCreate";
import TodoFilter from "./componets/TodoFilter";
import TodoList from "./componets/TodoList";

// const initialStateTodos = [
//   { id: 1, title: "Go to the gym", completed: true },
//   {
//     id: 2,
//     title: "10 minutes meditation",
//     completed: false,
//   },
//   {
//     id: 3,
//     title: "Pick up groceries",
//     completed: false,
//   },
//   {
//     id: 4,
//     title: "Complete todo app on Front end mentor",
//     completed: false,
//   },
//   {
//     id: 5,
//     title: "Complete online JavaScript bluuweb course",
//     completed: false,
//   },
// ];

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const App = () => {
  // const [todos, setTodos] = useState(initialStateTodos);

  const [filter, setFilter] = useState("all");
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem("todos")) || [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const createTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const computedItemsLeft = todos.filter((todo) => !todo.completed).length;

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const changeFilter = (filter) => {
    setFilter(filter);
  };

  const filteredTodos = () => {
    switch (filter) {
      case "all":
        return todos;
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      source === destination.index &&
      source.droppableId === destination.droppableId
    )
      return;

    setTodos((prevTasks) =>
      reorder(prevTasks, source.index, destination.index)
    );
  };

  return (
    <div
      className="min-h-screen bg-gray-300 bg-[url('./assets/images/bg-mobile-light.jpg')] bg-contain bg-no-repeat
     transition-all duration-1000 dark:bg-gray-900 dark:bg-[url('./assets/images/bg-mobile-dark.jpg')] 
     md:bg-[url('./assets/images/bg-desktop-light.jpg')] md:dark:bg-[url('./assets/images/bg-desktop-dark.jpg')]"
    >
      <Header />
      <main className="container mx-auto mt-8  px-4 md:max-w-xl ">
        <TodoCreate createTodo={createTodo} />

        <DragDropContext onDragEnd={handleDragEnd}>
          <TodoList
            todos={filteredTodos()}
            updateTodo={updateTodo}
            removeTodo={removeTodo}
          />
        </DragDropContext>
        <TodoComputed
          computedItemsLeft={computedItemsLeft}
          clearCompleted={clearCompleted}
        />
        <TodoFilter changeFilter={changeFilter} filter={filter} />
      </main>

      <footer className="mt-8 text-center dark:text-gray-400">
        Drag and drop to reorder list
      </footer>
    </div>
  );
};

export default App;
