import { css } from "styled-components";
import styled from "styled-components";

const ListItem = styled.li`
  ${({ variant }) =>
    variant === "good" &&
    css`
      background-color: #ffdc00;
    `}
  ${({ variant }) =>
    variant === "bad" &&
    css`
      background-color: #2ecc40;
    `}
  ${({ variant }) =>
    variant === "always" &&
    css`
      background-color: #39cccc;
    `}

    display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Text = styled.p`
  font-weight: bold;
`;

export { ListItem, Text };
