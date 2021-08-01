import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
//deleted Redirect to get rid of linting error

//import styled-components and picture
import styled from "styled-components";
import logIn from "./logIn.jpg";

//styled-components

const Image = styled.img`
  width: 100%;
  position: absolute;
  z-index: -1;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 30px;
  margin: 17% auto;
  padding: 1% 0%;
  width: 30%;
  text-align: center;
  line-height: 2;
  display: flex;
  flex-direction: column;

  animation: fadeIn 2s ease 1 normal;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @media (max-width: 625px) {
    // border: 1px solid black;
    background: white;
    margin: 68% auto;
    padding: 5% 5%;
    border: 0;
  }
  @media (max-width: 415px) {
    // border: 1px solid black;
    background: white;
    margin: 68% auto;
    padding: 0 50%;
  }
`;

const Texth2 = styled.h2`
  font-size: 30px;
  @media (max-width: 625px) {
    font-size: 20px;
  }
`;

const Login = (props) => {
  const initialValues = {
    username: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialValues);

  const [error, setError] = useState("");

  const { push } = useHistory();

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://ptct-secret-recipes.herokuapp.com/api/auth/login",
        formValues
      )
      .then((res) => {
        console.log(res);
        setError("");
        localStorage.setItem("token", res.data.token);
        push("/recipe-list");
      })
      .catch((err) => {
        console.log(err);
        setError("Invalid username or password.");
      });
    setFormValues(initialValues);
  };

  return (
    <div>
      <Image src={logIn} alt="loginPicture" />å
      <Center>
        <Container data-testid="loginForm" className="login-form">
          <Texth2>Log In</Texth2>
          <form onSubmit={handleSubmit}>
            <label>Username: </label>
            <input
              id="username"
              type="text"
              name="username"
              value={formValues.username}
              onChange={handleChange}
            />
            <br />
            <label> Password: </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />
            <br />
            <button id="submit">Log In</button>
          </form>
        </Container>
      </Center>
      <p id="error" className="error">
        {error}
      </p>
    </div>
  );
};

export default Login;
