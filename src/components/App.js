import RecipeList from "./RecipeList";
import "../css/app.css"
import React, { useState, useEffect } from "react";
import uuidv4 from "uuid/dist/v4";
import RecipeEdit from "./RecipeEdit";

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = "cookingWithReact.recipes";

function App() {
  const [recipes, setRecipes] = useState(sampleRecipes);
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  let selectedRecipe = recipes.find(r => r.id == selectedRecipeId);
  // console.log("selected Recipe:", selectedRecipe);

  useEffect(() => {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(localData != null){
      setRecipes(JSON.parse(localData));
    }
    console.log("application rendered");
  }, []);

  useEffect(() => {
    console.log("recipe state changed");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  };

  function handleRecipeSelect(id){
    setSelectedRecipeId(id);
  }

  function handleRecipeChange(id, recipe){
    const newRecipes = [...recipes];
    const targetId = newRecipes.findIndex(r => r.id == id);
    newRecipes[targetId] = recipe;
    setRecipes(newRecipes);
  }

  function handleRecipeAdd(){
    const recipe = {
      id: uuidv4(),
      name: "",
      servings: 1,
      cookTime: "",
      instructions: "",
      ingredients: [
        {
          id: uuidv4(),
          name: "",
          amount: ""
        }
      ]
    };
    handleRecipeSelect(recipe.id);
    setRecipes([...recipes, recipe]);
  }

  function handleRecipeDelete(id){
    setRecipes(recipes.filter(r => r.id != id));
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/>}
    </RecipeContext.Provider>
  );
}

const sampleRecipes = [
  {
    id: 1,
    name: "Plain Chicken",
    servings: 3,
    cookTime: "1:45",
    instructions: "1. Put salt on chicken\n2. Put chicken in oven\n3. Eat chicken",
    ingredients: [
      {
        id: 1,
        name: "Chicken",
        amount: "2 Pounds"
      },
      {
        id: 2,
        name: "Salt",
        amount: "1 Tbs"
      }
    ]
  },
  {
    id: 2,
    name: "Plain Pork",
    servings: 5,
    cookTime: "0:45",
    instructions: "1. Put paprika on pork\n2. Put pork in oven\n3. Eat pork",
    ingredients: [
      {
        id: 1,
        name: "Pork",
        amount: "3 Pounds"
      },
      {
        id: 2,
        name: "Paprika",
        amount: "2 Tbs"
      }
    ]
  }
];

export default App;
