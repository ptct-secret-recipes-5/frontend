// import axios from "axios";
import React, { useState } from "react";
import EditMenu from "./EditMenu";

export default function RecipeCard(props) {
  const { food, deleteHandler, setFoods } = props;
  const [edit, toggleEdit] = useState(false);

  const editToggler = () => {
    toggleEdit(true);
  };

  return (
    <div>
      <h2>{food.recipe_name}</h2>
      <p>By {food.source}</p>
      <p>Category: {food.category}</p>
      <h3>Ingredients</h3>
      <p>{food.ingredients}</p>
      <h3>Instructions</h3>
      <p>{food.instructions}</p>
      {!edit ? (
        <div>
          <button onClick={editToggler}>Edit</button>
          <button onClick={() => deleteHandler(food.recipe_id)}>Delete</button>
        </div>
      ) : (
        <EditMenu
          food={food}
          edit={edit}
          toggleEdit={toggleEdit}
          setFoods={setFoods}
        />
      )}
    </div>
  );
}
