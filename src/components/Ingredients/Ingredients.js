import React, { useState,useCallback } from 'react';
import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

const Ingredients =()=> {
  
  const [userIngredients,setUserIngredients]=useState([]);

  
  
  const filteredIngredientsHandler=useCallback(filteredIngredients=>{
    setUserIngredients(filteredIngredients)
  },[]) 
  
  const addIngredientHandler = ingredient=>{

    fetch('https://react-hooks-update-69cf2.firebaseio.com/ingredients.json',{
      method:"POST",
      body:JSON.stringify(ingredient),
      headers:{'Content-Type':'application/json'}

    }).then(response=>{
      return response.json();
    }).then(responseData=>{
      setUserIngredients(prevIngredients=>[
        ...prevIngredients,
        {id:responseData.name,...ingredient}
      ])
    })
    
  }
     
  

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} onRemoveItem={()=>{}} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredientlists={userIngredients} onRemoveItem={() => {}}/>
      </section>
    </div>
  );
}

export default Ingredients;
