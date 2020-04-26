import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

  const {onLoadIngredients} = props;
  const [enteredFilter,setEnteredFilter]=useState('');

  useEffect(()=>{
    const query = enteredFilter.length === 0?'':`?orderBy="title"&equalTo="${enteredFilter}"`
    fetch('https://react-hooks-update-69cf2.firebaseio.com/ingredients.json'+query)
    .then(res=>res.json())
    .then(resData=>{
      const loadedIngredients=[];
      for(const key in resData){
        loadedIngredients.push({
          id:key,
          title:resData[key].title,
          amount:resData[key].amount



        } )
      }
      onLoadIngredients(loadedIngredients)
    } )}, [enteredFilter,onLoadIngredients])


  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={enteredFilter} onChange={e=>setEnteredFilter(e.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
