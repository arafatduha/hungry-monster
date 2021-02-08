
const displayMeals = meals => {
    const displayResult = document.getElementById('displayResult')
    meals.forEach(food => {
        const column = document.createElement('div')
        column.className = "col-md-3 "
        const foodInfo = `
        <div onclick="getDetails('${food.idMeal}')" class="items-image card w-100 overflow-hidden">
        <img src="${food.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title text-center"> Name: ${food.strMeal} </h5>
            <h5 class="text-center">Food Category: ${food.strCategory}</h5>
            <h6 text-center"> origin: ${food.strArea} </h6>
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
const getDetails = idMeal => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayDetails(data.meals))
}


//clear display
const clearDisplay = () => {
    document.getElementById('displayResult').innerHTML="";
}

//Details display 
const displayDetails = meals => {
    const modalBody = document.getElementById('modalBody')
    meals.forEach(food => {
        const foodDetails = `
        <div class="card w-100">
            <div class="row g-0">
                <div class="col-md-6">
                    <img src="${food.strMealThumb}" class="card-img-top single-item-image" alt="...">
                </div>
                <div class="col-md-6">
                    <div class="card-body">
                        <h3 class="card-title">${food.strMeal} <span><button type="button" class="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button></span></h3>
                        <h5 class="card-title">Ingredients</h5>
                        <ul class="list-unstyled">
                            ${ingredientList(food)}
                        </ul>
                        <h3>!!Steps to Get the taste of it!!</h3>
                        <p class="bg-secondary">${food.strInstructions}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        `
        modalBody.innerHTML = foodDetails;
        const foodModal = new bootstrap.Modal(document.getElementById('foodModal'))
        foodModal.show()
    });
}


// Create Ingredient list
const ingredientList = food => {
    let li = ''

    for (let i = 1; i <= 15; i++) {
        let strIngredient = 'strIngredient' + i
        if (food[strIngredient]) {
            li = li + `<li> ${i}) ${food[strIngredient]}</li>`;
        }
    }
    return li;
}