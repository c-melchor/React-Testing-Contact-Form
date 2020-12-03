import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import ContactForm from "./ContactForm";
import userEvent from "@testing-library/user-event";

test("initial test, renders properly", () => {
  render(<ContactForm />);
});

test("can user fill out form and submit", () => {
  render(<ContactForm />);
  const nameInput = screen.getByPlaceholderText("Edd");
  const lastNameInput = screen.getByPlaceholderText("Burke");
  const emailInput = screen.getByPlaceholderText("bluebill1049@hotmail.com");
  const messageInput = screen.getByRole("textbox");

  userEvent.type(nameInput, "bob");
  userEvent.type(lastNameInput, "there");
  userEvent.type(emailInput, "type@email.com");
  userEvent.type(messageInput, "hey there hey there");

  const button = screen.getByTestId("submit");

  userEvent.click(button);

  const newPerson = screen.queryByText(/bob/i);
  expect(newPerson).toBeInTheDOM();
});
