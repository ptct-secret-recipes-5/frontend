import axios from "axios";
import React, { useState } from "react";

export default function EditMenu(props) {
  const { food, toggleEdit, setFoods } = props;
  //deleted edit from props for linter

  const initialFormValues = {
    name: food.recipe_name,
    source: food.source,
    category: food.category,
    ingredients: food.ingredients,
    instructions: food.instructions,
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const editedRecipe = {
    user_id: 1,
    recipe_name: formValues.name.trim(),
    source: formValues.source.trim(),
    ingredients: formValues.ingredients.trim(),
    category: formValues.category,
    instructions: formValues.instructions.trim(),
  };

  const onChange = (evt) => {
    const { name, value } = evt.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(evt.target);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://ptct-secret-recipes.herokuapp.com/api/recipes/${food.recipe_id}`,
        editedRecipe
      )
      .then((res) => {
        console.log("Edited:", res);
        axios
          .get("https://ptct-secret-recipes.herokuapp.com/api/recipes")
          .then((res) => setFoods(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    toggleEdit(false);
  };

  const handleCancel = () => {
    toggleEdit(false);
  };
  return (
    <div>
      <h3>Edit Recipe:</h3>
      <form>
        <label>
          Recipe Name:
          <br />
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={onChange}
          />
        </label>
        <br />
        <label>
          Recipe Source:
          <br />
          <input
            type="text"
            name="source"
            value={formValues.source}
            onChange={onChange}
          />
        </label>
        <br />
        <label>
          Recipe Category:
          <br />
          <select
            name="category"
            value={formValues.category}
            onChange={onChange}
          >
            <option value="">-- select recipe category --</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
            <option value="Side">Side Dish</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </label>
        <br />
        <label>
          Ingredients:
          <br />
          <input
            type="text"
            name="ingredients"
            value={formValues.ingredients}
            onChange={onChange}
          />
        </label>
        <br />
        <label>
          Instructions:
          <br />
          <input
            type="text"
            name="instructions"
            value={formValues.instructions}
            onChange={onChange}
          />
        </label>
        <br />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}
