import React, { useEffect, useState } from "react";
import loadData from "../helpers/loadData";

function Todos({ staticContext = {} }) {
  const [todos, setTodos] = useState(
    staticContext.data ? staticContext.data : []
  );

  useEffect(() => {
    if (window.__ROUTE_DATA__) {
      setTodos(window.__ROUTE_DATA__);
      delete window.__ROUTE_DATA__;
    } else {
      loadData("todos").then((data) => setTodos(data));
    }
  }, []);
  return (
    <div className="todos">
      {todos.length ? (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default Todos;
