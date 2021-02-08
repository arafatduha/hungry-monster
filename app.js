
const displayMeals = meals => {
    const displayResult = document.getElementById('displayResult')
    meals.forEach(food => {
        const column = document.createElement('div')
        column.className = "col-md-3"
        const foodInfo = `
        <div>
            <h3> '${food.idMeal}' </h3>
            <img src="${food.strMealThumb}">
        </div>
        `
        column.innerHTML = foodInfo;
        displayResult.appendChild(column);
    });
}

//Event listener 
var sf = document.getElementById('search-form');
if(sf){
document.getElementById('search-form').addEventListener('submit', function(event){
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value;
    clearDisplay();
    searchFood(searchInput);
})}
else{
    console.log("empty");
}

//search function 
const searchFood = inputTxt => {
    if(inputTxt){
        document.getElementById('search-form').reset();
        const url= `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputTxt}`
        fetch(url)
            .then(res=> res.json())
            .then(data=> {
                if(data.meals===null){
                   
                    const message= `<h3> "${inputTxt}" not Available now </h3>` 
                    displayMessage(message);
                }
                else{
                    const message= `<h3> "${inputTxt}" is ready to Display </h3>` 
                    displayMessage(message);
                    displayMeals(data.meals);
                }
                
            })
    }
    else {
        const message= "Please enter something and try again."; 
        clearDisplay();
        displayMessage(message);
    }
}

//display Message

const displayMessage = message =>{
    console.log(message);
    document.getElementById('message').innerHTML=message;
}


// Food Details 
const foodDetails = idMeal =>{
     const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
     fetch(url) 
        .then(res=> res.json)
        .then(data=> displayMeals(data.meals))
}

//clear display
const clearDisplay = () => {
    document.getElementById('displayResult').innerHTML="";
}