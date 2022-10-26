import { ListItem } from "./ToDo.styled";

export default function ToDo({ title, weather }) {
  return <ListItem variant={weather}>{title}</ListItem>;
}
