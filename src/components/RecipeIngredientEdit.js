import React, {useEffect} from 'react'

export default function RecipeIngredientEdit({ingredient, handleIngredientChange, handleIngredientDelete}) {

    function handleAChange(changes){
        console.log("edit triggered");
        handleIngredientChange(ingredient.id, {...ingredient, ...changes});
    }

    return (
        <>
            <input className="recipe-edit__input" type="text" onChange={(e) => handleAChange({name: e.target.value})} value={ingredient.name}/>
            <input className="recipe-edit__input" type="text" onChange={(e) => handleAChange({amount: e.target.value})} value={ingredient.amount}/>
            <button onClick={() => handleIngredientDelete(ingredient.id)} className="btn btn--danger">&times;</button>
        </>
    )
}
