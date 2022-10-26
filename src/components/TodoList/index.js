import { TodoList as List } from "./TodoList.styled.js";
import ToDo from "../ToDo/ToDo.js";

export default function TodoList({ todos }) {
  const amount = todos.length;
  return (
    <>
      <h2>ToDos to be completed ({amount})</h2>
      <List>
        {todos.map((todo) => {
          return <ToDo title={todo.title} key={todo.id + todo.title} weather={todo.weather}></ToDo>;
        })}
      </List>
    </>
  );
}
