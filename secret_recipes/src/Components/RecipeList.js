import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import RecipeCard from "./RecipeCard";
import Recipes from "./Recipes-two.jpg";

export default function RecipeList(props) {
  const { foods, setFoods } = props;
  console.log(foods);

  //Search state
  const [searchTerm, setSearchTerm] = useState("");
  //search onChange Helper
  const change = (evt) => {
    setSearchTerm(evt.target.value);
  };

  const deleteHandler = (id) => {
    axios
      .delete(`https://ptct-secret-recipes.herokuapp.com/api/recipes/${id}`)
      .then((res) => {
        console.log("Deleted:", res);
        axios
          .get("https://ptct-secret-recipes.herokuapp.com/api/recipes")
          .then((res) => setFoods(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Image className="homeImage" src={Recipes} alt="fancy-food" />
      <SearchDiv className="search">
        <Search
          type="text"
          placeholder="Search by recipe name or category"
          name="search"
          value={searchTerm}
          onChange={change}
        />
      </SearchDiv>
      <Container className="foodListContainer">
        {foods
          .filter((recipe) => {
            if (searchTerm === "") {
              return recipe;
            } else if (
              recipe.recipe_name
                .toLowerCase()
                .includes(searchTerm.toLocaleLowerCase()) ||
              recipe.category
                .toLocaleLowerCase()
                .includes(searchTerm.toLocaleLowerCase())
            ) {
              return recipe;
            } else return null;
          })
          .map((food, index) => (
            <Card className="food-list" key={index}>
              <RecipeCard
                food={food}
                key={index}
                deleteHandler={deleteHandler}
                setFoods={setFoods}
              />
            </Card>
          ))}
      </Container>
    </div>
  );
}

//Search input style
const SearchDiv = styled.div`
  display: flex;
  justify-content: center;
`;
const Search = styled.input`
  margin-top: 10px;
  width: 300px;
  height: 40px;
  font-size: 1.5rem;
  padding-left: 10px;
`;

//Styled-Components
// const Text = styled.h1`
//   // border: 1px solid black;
//   position: absolute;
//   margin-top: 17%;
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
//     margin-top: 13%;
//     font-size: 45px;
//   }
// `;
// const TextContainer = styled.div`
//   display: flex;
//   justify-content: center;
// `;

const Container = styled.div`
  margin-top: 36px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  filter: drop-shadow(0 0 3px gray);
  text-align: center;
`;

const Card = styled.div`
  z-index: 1;
  width: 250px;
  margin: 0 15px 32px;
  cursor: pointer;
  background: rgba(255, 255, 255, 255);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  padding: 1%;

  animation: fadeIn 2s ease 1 normal;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
const Image = styled.img`
  width: 100%;
`;
