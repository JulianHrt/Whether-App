import { ListItem } from "./ToDo.styled";

export default function ToDo({ title, weather, toggleCheckTodo, listId }) {
  return (
    <ListItem variant={weather}>
      <input
        type="checkbox"
        onClick={() => {
          toggleCheckTodo(listId);
        }}
      ></input>
      {title}
    </ListItem>
  );
}
