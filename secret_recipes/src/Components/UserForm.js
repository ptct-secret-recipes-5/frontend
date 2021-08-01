import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import schema from "../validation/userFormSchema";

//import background picture and styled-components
// import signUp from "./signUp.jpg";
import styled from "styled-components";

//import picture
import SignUp from "./signUp.jpg";

// const OutOfContainer = styled.div`
//   display: flex;
//   justify-content: center;
// `;

// const Container = styled.div`
//   position: absolute;
//   background: rgba(255, 255, 255, 0.9);
//   border: 1px solid rgba(255, 255, 255, 0.4);
//   border-radius: 30px;
//   margin: 13% 27%;
//   padding: 50px 70px;
//   text-align: center;
//   line-height: 2;
//   animation: fadeIn 2s ease 1 normal;
//   @keyframes fadeIn {
//     0% {
//       opacity: 0;
//     }

//     100% {
//       opacity: 1;
//     }
//   }
//   @media (max-width: 625px) {
//     border: 1px solid black;
//     background: white;
//     margin: 67% auto;
//     border: 0;
//   }
// `;

// const TextH2 = styled.h2`
//   @media (max-width: 625px) {
//     font-size: 19px;
//     margin-bottom: 4%;
//   }
// `;

//Initial form state
const initFormValues = {
  username: "",
  password: "",
  email: "",
};

//initial form errors
const initFormErrors = {
  username: "",
  password: "",
  email: "",
};

//styled components
const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 5%;
`;

const FormSection = styled.section`
  position: absolute;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 30px;
  margin: 10% 27%;
  padding: 50px 70px;
  text-align: center;
  line-height: 2;
  animation: fadeIn 2s ease 1 normal;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
  image h2 {
    padding: 0.5%;
    font-size: 3.7rem;
    width: 90%;
    margin: 0 auto;
    text-align: center;
  }
`;

const FormInputsDiv = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .input-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3% 1.5%;
  }
  .error-div {
    color: red;
    font-weight: bold;
  }
  .error-div2 {
    color: red;
    font-weight: bold;
    padding-left: 18%;
  }
  .inputBox {
    width: 100%;
    height: 2.75rem;
    background-color: #f0fff0;
  }
  label {
    font-size: 2.5rem;
    font-weight: bold;
    padding-left: 20%;
    padding-bottom: 1rem;
  }
  /* label {
    font-size: 2.5rem;
    font-weight: bold;
    padding-left: 30%;
    padding-bottom: 1rem;
  } */
  label input,
  select,
  textarea {
    line-height: 1.7;
  }
  button {
    text-decoration: none;
    font-size: 2rem;
    line-height: 2.3;
    font-weight: bold;
    border-radius: 25px;
    width: 60%;
    align-self: center;
  }
  button:hover {
    background-color: #98fb98;
    color: #f5fffa;
  }
  ::placeholder {
    text-align: center;
  }
`;

const Image = styled.img`
  width: 100%;
  position: absolute;
  z-index: -1;
`;

//disable sign up button
const disabledForm = true;

export default function SignupForm() {
  //form state
  const [userInfo, setUserInfo] = useState(initFormValues);
  //form errors state
  const [formErrors, setFormErrors] = useState(initFormErrors);
  //disable button state
  const [disabled, setDisabled] = useState(disabledForm);

  //helper functions

  //   validation helper
  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: "" }))
      .catch((err) => {
        setFormErrors({ ...formErrors, [name]: err.errors[0] });
      });
  };

  //change handler
  const onChange = (evt) => {
    const { name, value } = evt.target;
    //validate formValues
    validate(name, value);
    //set onChange to state
    setUserInfo({ ...userInfo, [name]: value });
  };

  //submit handler
  const onSubmit = (evt) => {
    //stop default reload upon submission
    evt.preventDefault();

    //collect new user data
    const newUser = {
      username: userInfo.name.trim(),
      password: userInfo.password.trim(),
      email: userInfo.email.trim(),
    };

    //post newUser to endpoint
    axios
      .post(
        "https://ptct-secret-recipes.herokuapp.com/api/auth/register",
        newUser
      )
      .then((res) => {
        console.log("NEW USER RESPONSE", res);
      })
      .catch((err) => {
        debugger;
        console.log(err);
      });
    setUserInfo(initFormValues);
  };

  //disabledForm accordingly every time formValues changes
  useEffect(() => {
    schema.isValid(userInfo).then((valid) => setDisabled(!valid));
  }, [userInfo]);
  return (
    <div>
      <Image src={SignUp} alt="fancy-cakes" />
      <FormSection className="form-container">
        <h2>Sign up to start adding your favorite recipes!</h2>
        <StyledForm onSubmit={onSubmit}>
          <FormInputsDiv className="form-inputs">
            {/* name text input */}
            <div className="input-div">
              <div className="error-div">{formErrors.name}</div>
              <label id="name">Name:</label>
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={onChange}
                placeholder="Enter your name"
                maxLength="18"
                size="18"
                className="inputBox"
              />
            </div>

            {/* password text input */}
            <div className="input-div">
              <div className="error-div">{formErrors.password}</div>
              <label id="password">Password:</label>
              <input
                type="password"
                name="password"
                value={userInfo.password}
                onChange={onChange}
                placeholder="enter a password"
                maxLength="18"
                size="18"
                className="inputBox"
              />
            </div>

            {/* email text input */}
            <div className="input-div">
              <div className="error-div2">{formErrors.email}</div>
              <label id="email">Email:</label>
              <input
                type="text"
                name="email"
                value={userInfo.email}
                onChange={onChange}
                placeholder="enter email"
                maxLength="30"
                size="30"
                className="inputBox"
              />
            </div>

            <button disabled={disabled}>Sign me up!</button>
          </FormInputsDiv>
        </StyledForm>
      </FormSection>
    </div>
  );
}
