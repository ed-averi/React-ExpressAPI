import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { useEffect } from "react";
import axios from "axios";
import { getTodos, patchTodo } from "../util/api"; //patchTodo

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos().then((remoteTodos) => {
      setTodos(remoteTodos);
    });
  }, []);

  const addTodo = async (todo) => {
    //making async the function
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    // const newTodos = [todo, ...todos];
    axios
      .post("http://localhost:8080/v1/to-dos", {
        ...todo,
        title: todo.text,
      })
      //once a new todo is added, show it right away on the page
      .then(() => {
        getTodos().then((remoteTodos) => {
          // console.log(response)
          setTodos(remoteTodos);
        });
      });
    // setTodos(newTodos);
    // console.log(...todos);
  };

  const showDescription = (todoId) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.showDescription = !todo.showDescription;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    patchTodo(todoId, newValue).then(() => {
      getTodos().then((remoteTodos) => {
        setTodos(remoteTodos);
      });
    });
    // axios
    //   .patch(`http://localhost:8080/v1/to-dos/${todoId}`, {
    //     ...newValue,
    //     title: newValue.text,
    //   })
    //   .then(() => {
    //     getTodos().then((remoteTodos) => {
    //       setTodos(remoteTodos);
    //     });
    //   });

    // setTodos((prev) =>
    //   prev.map((item) => (item.id === todoId ? newValue : item))
    // );
  };

  const removeTodo = (id) => {
    //it only works locally
    //const removedArr = [...todos].filter((todo) => todo.id !== id);
    axios.delete(`http://localhost:8080/v1/to-dos/${id}`).then(() => {
      getTodos().then((remoteTodos) => {
        setTodos(remoteTodos);
      });
    });

    // setTodos(removedArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.is_done = !todo.is_done;
        patchTodo(id, { ...todo });
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        showDescription={showDescription}
      />
    </>
  );
}

export default TodoList;
