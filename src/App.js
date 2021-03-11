import './App.css';
import {useEffect,useState,useRef} from 'react';

let App = () => {
  let [ingredientList,updateIngredientList] = useState([]); 
  let [loading,setLoading] = useState(false);

  let inputRef = useRef(null);
  let Api_Key= 'b819919ea5e0bae85884f17b9f048333';
  let Api_Id= '27e25c04';  

   let search =() => {
     searchForRecipe(inputRef.current.value);
     inputRef.current.value ="";
   }


  let searchForRecipe =(query) =>{
    setLoading(true);
    let url= `search?q=${query}&app_id=${Api_Id}&app_key=${Api_Key} `;
    fetch(url,{mode:"no-cors"})
    .then(response =>{
      return response.json();
    }).then(res =>{
      console.log(res.hits);
      updateIngredientList(res.hits);
      setLoading(false);
    }).catch(err =>{
      console.log(err);
      setLoading(false);
    })
  }

  useEffect(()=>{
 searchForRecipe('Chicken')
  },[]); 
 
  return (
    <div className="App">
      <header className="App-header">
        <div className="InputWrapper">
          <input ref={inputRef}  placeholder="Search for recipe" />
          <button   onClick={search} >Search</button>
        </div>
        {loading && <p>Loading...</p>}
    <div className="Wrapper">
     {ingredientList.map(({recipe})=>{
       let {label,image,ingredientLines} = recipe;
       return (
         <div  key={label} className="Ingredient">
               <span>{label}</span>
               <img src={image}  alt="photos"  />
               <div className="Steps">
               {ingredientLines.map((step,index) =>{
                 return <p key={index }>{step}</p>
               })}
               </div>
         </div>
       );
     })}
    </div>
      </header>
    </div>
  );
}

export default App;
