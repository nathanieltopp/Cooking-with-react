import React, { useContext } from 'react'
import { RecipeContext } from './App'
import RecipeIngredientEdit from './RecipeIngredientEdit'
import uuidv4 from "uuid/dist/v4"

export default function RecipeEdit({recipe}) {
    const {handleRecipeChange, handleRecipeSelect} = useContext(RecipeContext);

    function handleChange(changes){
        handleRecipeChange(recipe.id, {...recipe, ...changes})
    }

    function handleIngredientChange(id, ingredient){
        const newIngredients = [...recipe.ingredients];
        const targetId = newIngredients.findIndex(i => i.id == id);
        newIngredients[targetId] = ingredient;
        handleChange({ingredients: newIngredients});
    }

    function handleIngredientAdd(){
        const newIngredient = {
            id: uuidv4(),
            name: "",
            amount: ""
        }

        handleChange({ingredients: [...recipe.ingredients, newIngredient]});
    }

    function handleIngredientDelete(id){
        handleChange({ingredients: recipe.ingredients.filter(i => i.id != id)});
    }


    return (
        <div className="recipe-edit">
            <div className="recipe-edit__remove-btn-container">
                <button onClick={() => handleRecipeSelect(undefined)} className="btn recipe-edit__remove-btn">&times;</button>
            </div>
            <div className="recipe-edit__details-grid">
                <label className="recipe-edit__label" htmlFor="name">Name</label>
                <input className="recipe-edit__input" type="text" name="name" id="name" onChange={e => handleChange({[e.target.name]: e.target.value})} value={recipe.name}/>
                <label className="recipe-edit__label" htmlFor="cookTime" >Cook Time</label>
                <input className="recipe-edit__input" type="text" name="cookTime" id="cookTime" onChange={e => handleChange({[e.target.name]: e.target.value})} value={recipe.cookTime}/>
                <label className="recipe-edit__label" htmlFor="servings">Servings</label>
                <input className="recipe-edit__input" type="number" min="1" name="servings" id="servings" onChange={e => handleChange({[e.target.name]: parseInt(e.target.value) || ""})} value={recipe.servings}/>
                <label className="recipe-edit__label" htmlFor="instructions">Instructions</label>
                <textarea className="recipe-edit__input" name="instructions" id="instructions" onChange={e => handleChange({[e.target.name]: e.target.value})} value={recipe.instructions}/>
            </div>
            <br />
            <label className="recipe-edit__label" htmlFor="ingredients">Ingredients</label>
            <div className="recipe-edit__ingredient-grid">
                <div>Name</div>
                <div>Amount</div>
                <div></div>
                {/* Ingredient Components */}
                {recipe.ingredients.map(ingredient => (
                    <RecipeIngredientEdit 
                    key={ingredient.id} ingredient={ingredient} handleIngredientChange={handleIngredientChange} 
                    handleIngredientDelete={handleIngredientDelete}
                    />
                ))}
            </div>
            <div className="recipe-edit__add-ingredient-btn-container">
                <button onClick={() => handleIngredientAdd()} className="btn btn--primary">Add Ingredient</button>
            </div>
        </div>
    )
}
