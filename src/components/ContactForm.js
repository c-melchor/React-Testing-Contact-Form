import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const ContactForm = () => {
  const [data, setData] = useState();
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur"
  });

  const onSubmit = async data => {
    const helloData = await axios.post(
      "https://reqres.in/api/users?page=2",
      data
    );
    setData(helloData.data);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name*</label>
          <input
            name="firstName"
            placeholder="Edd"
            ref={register({ required: true, maxLength: 3 })}
          />
          {errors.firstName && (
            <p data-testid="nameError">
              Looks like there was an error: {errors.firstName.type}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lastName">Last Name*</label>
          <input
            id="lastName"
            name="lastName"
            placeholder="Burke"
            ref={register({ required: true })}
          />
          {errors.lastName && (
            <p>Looks like there was an error: {errors.lastName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="email">Email*</label>
          <input
            id="email"
            name="email"
            placeholder="bluebill1049@hotmail.com"
            ref={register({ required: true })}
          />
          {errors.email && (
            <p>Looks like there was an error: {errors.email.type}</p>
          )}
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            ref={register({ required: false })}
          />
        </div>
        {data && (
          <pre
            style={{
              textAlign: "center",
              color: "white",
              background: "blue",
              textDecoration: "none"
            }}
          >
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
        <input data-testid="submit" type="submit" />
      </form>
    </div>
  );
};

export default ContactForm;
