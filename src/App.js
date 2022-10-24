import React, { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import HashLoader from "react-spinners/HashLoader";

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="todo-app">
      {loading ? (
        <HashLoader
          color={"#141113"}
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <header className="App-header">
          <TodoList />
        </header>
      )}
    </div>
  );
}

export default App;
