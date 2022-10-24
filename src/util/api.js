import axios from "axios";
// import setTodos from "../components/TodoList"
//Show todos when first loading the app.
async function getTodos() {
  try {
    const {
      data: { todos },
    } = await axios.get("http://localhost:8080/v1/to-dos");
    return todos;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

async function patchTodo(todoId, newValues) {
  try {
    axios.patch(`http://localhost:8080/v1/to-dos/${todoId}`, {
      ...newValues,
      title: newValues.text,
    });
    //   .then(()=>{
    //     getTodos().then((remoteTodos)=>{
    //         setTodos(remoteTodos);
    //     })
    //   })
  } catch (error) {
    console.error(error.message);
  }
}

export { getTodos, patchTodo }; //patchTodo
