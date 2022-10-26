import { TodoList as List } from "./TodoList.styled.js";
import ToDo from "../ToDo/ToDo.js";

export default function TodoList({ todos, toggleCheckTodo, children, list }) {
  const filteredTodos = todos.filter((todo) => {
    if (list === "notdone") {
      return todo.isChecked === false;
    } else {
      return todo.isChecked === true;
    }
  });

  const amount = filteredTodos.length;
  return (
    <>
      <h2>
        {children} ({amount})
      </h2>
      <List>
        {filteredTodos.map((todo, index) => {
          return (
            <ToDo
              toggleCheckTodo={toggleCheckTodo}
              title={todo.title}
              key={index + todo.title}
              weather={todo.weather}
              listId={todo.id}
            ></ToDo>
          );
        })}
      </List>
    </>
  );
}
