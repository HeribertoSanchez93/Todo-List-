import React from "react";

const TodoComputed = ({ computedItemsLeft, clearCompleted }) => {
  return (
    <section className="flex justify-between rounded-b-md bg-white py-4 px-4">
      <span className="text-gray-400">{computedItemsLeft} Items left</span>
      <button className="text-gray-400" onClick={clearCompleted}>
        Clear Compleated
      </button>
    </section>
  );
};

export default TodoComputed;
