// show all button
const buttonShowAll = document.getElementById("show-all");
const mealsSection = document.getElementById("meals-section");
const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=Chicken`;

const loadMeals = async () => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayMeals(data.meals.slice(0, 6));
  } catch (err) {
    console.log(err);
  }
};

const showAllMeals = async () => {
  // clear meal section
  mealsSection.textContent = "";
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayMeals(data.meals);
  } catch (err) {
    console.log(err);
  }
};

const displayMeals = async (meals) => {
  meals.forEach((meal) => {
    const mealBox = document.createElement("div");
    mealBox.classList.add("col");
    mealBox.innerHTML = `
      <div class="card h-100">
         <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
         <div class="card-body">
         <h5 class="card-title">${meal.strMeal}</h5>
         <p class="card-text">
            This is a longer card with supporting text below as a
            natural lead-in to additional content. This content is a
            little bit longer.
         </p>
         </div>
         <div>
            <button type="button" onclick="loadMealDetails(${meal.idMeal})" class="btn btn-warning fw-bold py-2 px-5 m-3" data-bs-toggle="modal" data-bs-target="#meal-details">
               Details
            </button>
         </div>
      </div>
   `;

    // append meal box in the meal section
    mealsSection.appendChild(mealBox);
  });
};

const searchMeal = async () => {
  const inputField = document.getElementById("input-field");
  const inputValue = inputField.value;
  displaySearchMeal(inputValue);

  // clear input field
  inputField.value = "";
};

const displaySearchMeal = async (search) => {
  // clear meal section
  mealsSection.textContent = "";
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
  const res = await fetch(url);
  const data = await res.json();
  displayMeals(data.meals.slice(0, 6));
};

const loadMealDetails = async (mealId) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayMealDetails(data.meals[0]);
};

const displayMealDetails = (meal) => {
  console.log(meal);
  const title = document.getElementById("mealDetailsLabel");
  title.innerText = `${meal.strMeal}`;
  title.style.marginLeft = `1rem`;

  //   description
  const descriptionBody = document.getElementById("details-body");
  descriptionBody.innerHTML = `
   <div class="text-center details-meal-image">
      <img class="img-fluid" src="${meal.strMealThumb}" alt="image of meal" />
   </div>
   <div>
      <p class="mt-5"><strong>Category : </strong>${meal.strCategory}</p>
      <p><strong>Area : </strong>${meal.strArea}</p>
      <p><strong>Instruction : </strong>${meal.strInstructions.slice(
        0,
        300
      )}</P>
      <p><strong>Youtube : </strong><a href="${
        meal.strYoutube
      }" target="_blank" class="text-dark">${meal.strYoutube}</a>
   </div>
  `;
  descriptionBody.style.maxWidth = `700px`;
  descriptionBody.style.margin = `0 auto`;
  descriptionBody.style.fontSize = `0.95rem`;
  descriptionBody.style.padding = `0 1rem`;
};

loadMeals();
