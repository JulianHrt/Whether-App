import Svg from "../Svg";
import Button from "../Button";
import {
  ModalBackground,
  Modal,
  Form,
  Input,
  ButtonGroup,
} from "./AddTodo.styled.js";
import { useState } from "react";
import { nanoid } from "nanoid";

export default function AddTodo({ addTodo }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const generatedId = nanoid();
    addTodo(generatedId, data.title, false, data.wheather__condition);

    setTimeout(() => {
      setIsOpen(() => !isOpen);
    }, 500);
  }

  return (
    <>
      <Button
        type="button"
        variant="floating"
        onClick={() => {
          setIsOpen((isOpen) => !isOpen);
        }}
      >
        <Svg variant="add" color="#fff" />
      </Button>
      {isOpen && (
        <ModalBackground>
          <Modal>
            <Button
              type="button"
              variant="close"
              onClick={() => {
                setIsOpen((isOpen) => !isOpen);
              }}
            >
              <Svg variant="close" color="#3d3d3d" />
            </Button>

            <Form onSubmit={handleSubmit}>
              <h2>Add your new Todo</h2>
              <label>
                Add new ToDo
                <Input name="title" type="text" maxLength="20" required></Input>
              </label>
              <label>choose weather:</label>
              <label for="always">
                always
                <input
                  name="wheather__condition"
                  id="always"
                  type="radio"
                  value="always"
                  defaultChecked
                ></input>
              </label>
              <label for="good">
                good
                <input
                  name="wheather__condition"
                  id="good"
                  type="radio"
                  value="good"
                ></input>
              </label>
              <label for="bad">
                bad
                <input
                  name="wheather__condition"
                  id="bad"
                  type="radio"
                  value="bad"
                ></input>
              </label>

              <ButtonGroup>
                <label for="submit">
                  <Button id="submit" type="submit" variant="save">
                    submit
                  </Button>
                </label>
                <label for="cancel">
                  <Button
                    id="cancel"
                    type="button"
                    onClick={() => {
                      setIsOpen((isOpen) => !isOpen);
                    }}
                    variant="cancel"
                  >
                    cancel
                  </Button>
                </label>
              </ButtonGroup>
            </Form>
          </Modal>
        </ModalBackground>
      )}
    </>
  );
}
