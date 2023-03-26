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
    console.log(meal);
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
      </div>
   `;

    // append meal box in the meal section
    mealsSection.appendChild(mealBox);
  });
};

loadMeals();
