import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import ContactForm from "./ContactForm";
import userEvent from "@testing-library/user-event";

test("initial test, renders properly", () => {
  render(<ContactForm />);
});

test("can user fill out form and submit", async () => {
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

  const firstNameRender = await screen.findByText(/bob/i);
  expect(firstNameRender).toBeInTheDocument();
});

test("if name is too long", async () => {
  const { queryByTestId } = render(<ContactForm />);
  const nameInput = screen.getByPlaceholderText("Edd");
  const lastNameInput = screen.getByPlaceholderText("Burke");

  //   console.log(nameInput.value, "name input");
  await act(async () => {
    userEvent.type(nameInput, "Christina");
    fireEvent.blur(nameInput);
    userEvent.click(lastNameInput);
  });
  expect(queryByTestId("nameError")).toBeTruthy();
  // const nameErr = await screen.getByTestId("nameError");
  //   expect(nameErr).toBeInTheDocument();
});

/*async await is a simplified way to do promises

const apiCall = () = {
    return new Promise((res)=>{
setTimeout(()=>{
    resolve("the return value")
}, 3000)
    })
}

-this function will return a promise, that is PENDING
-if you want to get the actual return value,you would have to console log in the .then()
-this is how promises work, not returning the value directly
-gets messy when you are trying to call the function multiple times
-you will have to nest the promise inside of the promise

const threeTime = () =>{
    apiCall(1).then(res=>{
        console.log(res)
    })
     apiCall(2).then(res=>{
        console.log(res)
    })
     apiCall(3).then(res=>{
        console.log(res)
    })
}
threeTime();


//first you need to mark a funciton with async behavior
//then create consts
//easier to read when it's like this
//it's like there is a .then before each thing
//waits for one thing to be done before moving on

const threeTimeAsync = async() =>{
    const call1= await.apiCall(1);
    console.log(call1)
    const call2= await.apiCall(2);
    console.log(call2)
    const call3= await.apiCall(3);
    console.log(call3)
}
*/
