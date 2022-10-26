import { css } from "styled-components";
import styled from "styled-components";

const ListItem = styled.li`
  ${({ variant }) =>
    variant === "good" &&
    css`
      background-color: yellow;
    `}
  ${({ variant }) =>
    variant === "bad" &&
    css`
      background-color: blue;
    `}
  ${({ variant }) =>
    variant === "always" &&
    css`
      background-color: green;
    `}
`;
export { ListItem };
