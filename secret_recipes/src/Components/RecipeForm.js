import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import schema from "../validation/recipeFormSchema";
import styled from "styled-components";

//Initial form state
const initialFormValues = {
  name: "",
  source: "",
  category: "",
  ingredients: "",
  instructions: "",
};

//initial form errors
const initialFormErrors = {
  name: "",
  source: "",
  category: "",
  ingredients: "",
  instructions: "",
};

//disable submit button
const initialDisabled = true;

// ***********STYLED COMPONENTS*********
// ***********STYLED COMPONENTS*********
const FormSection = styled.section`
  h2 {
    background-color: #98fb98;
    color: #f5fffa;
    padding: 2%;
    font-size: 3.7rem;
    width: 90%;
    margin: 0 auto;
  }
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormInputsDiv = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  border: 1 px solid orange;

  .input-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3% 1.5%;
  }

  .odd {
    background-color: #98fb98;
    color: #f5fffa;
  }

  .even {
    background-color: #f0fff0;
    color: #00ff00;
  }

  .error-div {
    color: red;
    font-weight: bold;
  }

  label {
    font-size: 2rem;
    font-weight: bold;
    padding-left: 1%;
  }

  input,
  select,
  textarea {
    line-height: 1.7;
  }

  button {
    text-decoration: none;
    font-size: 2rem;
    line-height: 2.3;
    font-weight: bold;
    background-color: #98fb98;
    color: #f5fffa;
  }
`;

export default function RecipeForm() {
  //form state
  const [formValues, setFormValues] = useState(initialFormValues);
  //form errors state
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  //disable button state
  const [disabled, setDisabled] = useState(initialDisabled);

  //helper functions

  //validation helper
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
    setFormValues({ ...formValues, [name]: value });
  };

  //submit handler
  const onSubmit = (evt) => {
    //stop default reload upon submission
    evt.preventDefault();

    //collect new formValues
    const newRecipe = {
      name: formValues.name.trim(),
      source: formValues.source.trim(),
      category: formValues.category,
      ingredients: formValues.ingredients.trim(),
      instructions: formValues.instructions.trim(),
    };

    //post newRecipe to endpoint, USING FAKE API AS PLACEHOLDER
    axios
      .post("https://reqres.in/api/users", newRecipe)
      .then((res) => console.log("NEW RECIPE RESPONSE", res))
      .catch((err) => {
        debugger;
      });
    setFormValues(initialFormValues);
  };

  //setDisabled accordingly every time formValues changes
  useEffect(() => {
    schema.isValid(formValues).then((valid) => setDisabled(!valid));
  }, [formValues]);

  return (
    <FormSection className="form-container">
      <h2>Add Your Favorite Recipe</h2>

      <StyledForm onSubmit={onSubmit}>
        <FormInputsDiv className="form-inputs">
          {/* name text input */}
          <div className="input-div even">
            <div className="error-div">{formErrors.name}</div>
            <label id="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formValues.name}
              onChange={onChange}
              placeholder="Enter your recipe name here"
              maxLength="40"
              size="40"
            />
          </div>

          {/* source text input */}
          <div className="input-div odd">
            <div className="error-div">{formErrors.source}</div>
            <label id="source">Source</label>
            <input
              id="source"
              type="text"
              name="source"
              value={formValues.source}
              onChange={onChange}
              placeholder="Where did it come from?"
              maxLength="40"
              size="40"
            />
          </div>

          {/* category dropdown */}
          <div className="input-div even">
            <div className="error-div">{formErrors.category}</div>
            <label id="category">Category</label>
            <select
              id="category"
              name="category"
              value={formValues.category}
              onChange={onChange}
            >
              <option value="">-- select recipe category --</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="dessert">Dessert</option>
              <option value="side">Side Dish</option>
              <option value="appetizer">Appetizer</option>
              <option value="miscellaneous">Miscellaneous</option>
            </select>
          </div>

          {/* ingredients text area */}
          <div className="input-div odd">
            <div className="error-div">{formErrors.ingredients}</div>
            <label id="ingredients">Ingredients</label>
            <textarea
              rows={8}
              id="ingredients"
              type="textarea"
              name="ingredients"
              value={formValues.ingredients}
              onChange={onChange}
              placeholder="What ingredients do you need for your dish?"
              maxLength="300"
            />
          </div>

          {/* instructions textarea */}
          <div className="input-div even">
            <div className="error-div">{formErrors.instructions}</div>
            <label id="instructions">Instructions</label>
            <textarea
              rows={12}
              id="instructions"
              type="textarea"
              name="instructions"
              value={formValues.instructions}
              onChange={onChange}
              placeholder="What are the steps needed to make this recipe?"
              maxLength="600"
            />
          </div>
          <button disabled={disabled}>Submit Recipe</button>
        </FormInputsDiv>
      </StyledForm>
    </FormSection>
  );
}
