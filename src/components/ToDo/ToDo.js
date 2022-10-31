import { ListItem, Text } from "./ToDo.styled";
import Button from "../Button";
import Svg from "../Svg";

export default function ToDo({
  title,
  weather,
  toggleCheckTodo,
  listId,
  deleteTodo,
}) {
  return (
    <ListItem variant={weather}>
      <input
        type="checkbox"
        onClick={() => {
          toggleCheckTodo(listId);
        }}
      ></input>
      <Text>{title}</Text>
      <Button type="button" variant="icon" onClick={() => deleteTodo(listId)}>
        <Svg variant="delete" color="#fffff" />
      </Button>
    </ListItem>
  );
}
