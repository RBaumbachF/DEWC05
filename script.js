import { RestaurantsManager } from './Manager.js';

let catMeat, catFish, catDessert, menuTasting, menuExecutive, menuKids, allGluten, allDairy,
    allEggs, allNuts, restNuestro, restEntre, restAgua, dishLasagna, dishSteak, dishTurkey, dishCurry, dishSushi, dishTuna, dishSardine, dishCod, dishCake, dishBrownie, dishJelly, dishMousse, initialStatus;

let divCentral = document.getElementById("central");

window.addEventListener("load", () => {

    createInitialObjects();

    initialStatus = document.getElementById("central").cloneNode(true);

    document.getElementById("homePageLink").addEventListener("click", () => {
        showHomePage();
    });

    document.getElementById("navAllergens").addEventListener("click", () => {
        showAllergens();
    });

    document.getElementById("navMenus").addEventListener("click", () => {
        showMenus();
    });

    let hijosUlCategories = document.getElementById("ulCategories").children;

    // a dentro de li
    for (let i = 0; i < hijosUlCategories.length; i++) {
        const child = hijosUlCategories[i];
        child.addEventListener('click', () => { showDishesInCategory(child.firstChild) });
    }

    let hijosUlRestaurantes = document.getElementById("ulRestaurants").children;

    // a dentro de li
    for (let i = 0; i < hijosUlRestaurantes.length; i++) {
        const child = hijosUlRestaurantes[i];
        child.addEventListener('click', () => { showRestaurants(child.firstChild) });
    }


})



function createInitialObjects() {
    try {
        const dishLasagna = RestaurantsManager.getInstance().createDish("Lasaña de carne");
        const dishSteak = RestaurantsManager.getInstance().createDish("Filete de ternera");
        const dishTurkey = RestaurantsManager.getInstance().createDish("Pavo katsu");
        const dishCurry = RestaurantsManager.getInstance().createDish("Pollo al curry");
        const dishSushi = RestaurantsManager.getInstance().createDish("Sushi de salmón");
        const dishTuna = RestaurantsManager.getInstance().createDish("Atún a la plancha");
        const dishSardine = RestaurantsManager.getInstance().createDish("Sardinas picantes");
        const dishCod = RestaurantsManager.getInstance().createDish("Bacalao con verduras");
        const dishCake = RestaurantsManager.getInstance().createDish("Tarta de queso");
        const dishBrownie = RestaurantsManager.getInstance().createDish("Brownie de chocolate");
        const dishJelly = RestaurantsManager.getInstance().createDish("Gelatina de fresa");
        const dishMousse = RestaurantsManager.getInstance().createDish("Mousse de caramelo");

        dishLasagna.ingredients = "Ternera";
        dishSteak.ingredients = "Ternera";
        dishTurkey.ingredients = "Pavo";
        dishCurry.ingredients = "Pollo";
        dishSushi.ingredients = "Salmón";
        dishTuna.ingredients = "Atún";
        dishSardine.ingredients = "Sardinas";
        dishCod.ingredients = "Bacalao";
        dishBrownie.ingredients = "Chocolate";
        dishCake.ingredients = "Queso";
        dishJelly.ingredients = "Fresas";
        dishMousse.ingredients = "Caramelo";

        RestaurantsManager.getInstance().addDish(dishLasagna, dishSteak, dishTurkey, dishCurry, dishSushi, dishTuna, dishSardine, dishCod, dishCake, dishBrownie, dishJelly, dishMousse);

        catMeat = RestaurantsManager.getInstance().createCategory("Carne");
        catFish = RestaurantsManager.getInstance().createCategory("Pescado");
        catDessert = RestaurantsManager.getInstance().createCategory("Postre");

        RestaurantsManager.getInstance().addCategory(catMeat, catFish, catDessert);

        allGluten = RestaurantsManager.getInstance().createAllergen("Gluten");
        allDairy = RestaurantsManager.getInstance().createAllergen("Lácteos");
        allEggs = RestaurantsManager.getInstance().createAllergen("Huevos");
        allNuts = RestaurantsManager.getInstance().createAllergen("Frutos secos");

        RestaurantsManager.getInstance().addAllergen(allGluten, allDairy, allEggs, allNuts);

        menuTasting = RestaurantsManager.getInstance().createMenu("Menú Degustación");
        menuExecutive = RestaurantsManager.getInstance().createMenu("Menú Ejecutivo");
        menuKids = RestaurantsManager.getInstance().createMenu("Menú Infantil");

        RestaurantsManager.getInstance().addMenu(menuTasting, menuExecutive, menuKids);

        restNuestro = RestaurantsManager.getInstance().createRestaurant("Nuestro Bar");
        restEntre = RestaurantsManager.getInstance().createRestaurant("Entreamigos");
        restAgua = RestaurantsManager.getInstance().createRestaurant("Agua Viva");

        RestaurantsManager.getInstance().addRestaurant(restNuestro, restEntre, restAgua);

        RestaurantsManager.getInstance().assignCategoryToDish(catMeat, dishLasagna, dishSteak, dishTurkey, dishCurry);
        RestaurantsManager.getInstance().assignCategoryToDish(catFish, dishSushi, dishTuna, dishSardine, dishCod);
        RestaurantsManager.getInstance().assignCategoryToDish(catDessert, dishCake, dishBrownie, dishJelly, dishMousse);

        RestaurantsManager.getInstance().assignDishtoMenu(menuTasting, dishTurkey, dishCurry, dishSushi);
        RestaurantsManager.getInstance().assignDishtoMenu(menuExecutive, dishCod, dishSteak, dishMousse);
        RestaurantsManager.getInstance().assignDishtoMenu(menuKids, dishLasagna, dishTuna, dishBrownie);

        RestaurantsManager.getInstance().assignAllergentoDish(allGluten, dishLasagna, dishCake, dishBrownie, dishMousse);
        RestaurantsManager.getInstance().assignAllergentoDish(allDairy, dishCake, dishBrownie, dishMousse);
        RestaurantsManager.getInstance().assignAllergentoDish(allEggs, dishCake, dishBrownie, dishMousse);
        RestaurantsManager.getInstance().assignAllergentoDish(allNuts, dishBrownie);


        showCategories();

        // MOSTRAR PLATOS ALEATORIOS
        const arraydishes = [dishLasagna, dishSteak, dishTurkey, dishCurry, dishSushi, dishTuna, dishSardine, dishCod, dishCake, dishBrownie, dishJelly, dishMousse];

        const randomDishes = selectRandomItems(arraydishes, 3);

        let div = createSection("randomDishes");

        randomDishes.forEach(function (dish) {
            let article = createDishCard(dish);
            div.appendChild(article);
        });

        function selectRandomItems(list, n) {
            const result = [];
            const listCopy = list.slice();
            for (let i = 0; i < n; i++) {
                const randomIndex = Math.floor(Math.random() * listCopy.length);
                const selectedItem = listCopy.splice(randomIndex, 1)[0];
                result.push(selectedItem);
            }
            return result;
        }


    } catch (error) {
        console.log(error);
    }
}


function showHomePage() {
    clearPage();
    divCentral.appendChild(initialStatus);
}

function showCategories() {
    clearPage();
    let div = createSection("categories");
    const arrayCateg = [catMeat, catFish, catDessert];
    arrayCateg.forEach((elem) => {
        let article = createElementCard(elem);
        div.appendChild(article);
        article.addEventListener("click", () => { showDishesInCategory(article) });
    });
}

function showAllergens() {
    clearPage();
    let div = createSection("allergens");
    const arrayAllergens = [allGluten, allDairy, allEggs, allNuts];
    arrayAllergens.forEach((elem) => {
        let article = createElementCard(elem);
        div.appendChild(article);
        article.addEventListener("click", () => { showDishesWithAllergen(article) });
    });
}

function showMenus() {
    clearPage();
    let div = createSection("menus");
    const arrayMenus = [menuTasting, menuExecutive, menuKids];
    arrayMenus.forEach((elem) => {
        let article = createElementCard(elem);
        div.appendChild(article);
        article.addEventListener("click", () => { showDishesInMenu(article) });
    });
}

function showRestaurants(rest) {
    clearPage();
    let article;
    if (rest.id === "navNuestro") {
        article = createDishCard(restNuestro);
    } else if (rest.id === "navEntre") {
        article = createDishCard(restEntre);
    } else if (rest.id === "navAgua") {
        article = createDishCard(restAgua);
    }
    let div = createSection("restarurants");
    div.appendChild(article);
}

function showDishesWithAllergen(allId) {
    clearPage();
    let iteratorDishesWithAllergen;

    if (allId.textContent === "Gluten") {
        iteratorDishesWithAllergen = RestaurantsManager.getInstance().getDishesWithAllergen(allGluten, function (objA, objB) {
            return objA._name.toLocaleLowerCase().localeCompare(objB._name.toLocaleLowerCase());
        });

    } else if (allId.textContent === "Lácteos") {
        iteratorDishesWithAllergen = RestaurantsManager.getInstance().getDishesWithAllergen(allDairy, function (objA, objB) {
            return objA._name.toLocaleLowerCase().localeCompare(objB._name.toLocaleLowerCase());
        });
    } else if (allId.textContent === "Huevos") {
        iteratorDishesWithAllergen = RestaurantsManager.getInstance().getDishesWithAllergen(allEggs, function (objA, objB) {
            return objA._name.toLocaleLowerCase().localeCompare(objB._name.toLocaleLowerCase());
        });
    } else if (allId.textContent === "Frutos secos") {
        iteratorDishesWithAllergen = RestaurantsManager.getInstance().getDishesWithAllergen(allNuts, function (objA, objB) {
            return objA._name.toLocaleLowerCase().localeCompare(objB._name.toLocaleLowerCase());
        });
    }

    let div = createSection("dishesWithAllergen")

    for (let iterator of iteratorDishesWithAllergen) {
        let article = createDishCard(iterator);
        div.appendChild(article);
    }
}

function showDishesInMenu(menuId) {
    clearPage();
    let iteratorDishesInMenu;

    if (menuId.outerText === "Menú Degustación") {
        iteratorDishesInMenu = RestaurantsManager.getInstance().getDishesInMenu(menuTasting, function (objA, objB) {
            return objA._name.toLocaleLowerCase().localeCompare(objB._name.toLocaleLowerCase());
        });

    } else if (menuId.outerText === "Menú Ejecutivo") {
        iteratorDishesInMenu = RestaurantsManager.getInstance().getDishesInMenu(menuExecutive, function (objA, objB) {
            return objA._name.toLocaleLowerCase().localeCompare(objB._name.toLocaleLowerCase());
        });
    } else if (menuId.outerText === "Menú Infantil") {
        iteratorDishesInMenu = RestaurantsManager.getInstance().getDishesInMenu(menuKids, function (objA, objB) {
            return objA._name.toLocaleLowerCase().localeCompare(objB._name.toLocaleLowerCase());
        });
    }

    let div = createSection("dishesInMenu");
    for (let iterator of iteratorDishesInMenu) {
        let article = createDishCard(iterator);
        div.appendChild(article);
    }
}



function showDishesInCategory(categ) {
    clearPage();
    let iteratorDishesInCategory;

    if (categ.outerText === "Carne" || categ.id === "navMeat") {
        iteratorDishesInCategory = RestaurantsManager.getInstance().getDishesInCategory(catMeat, function (objA, objB) {
            return objA._name.toLocaleLowerCase().localeCompare(objB._name.toLocaleLowerCase());
        });
    } else if (categ.outerText === "fish" || categ.id === "navFish") {
        iteratorDishesInCategory = RestaurantsManager.getInstance().getDishesInCategory(catFish, function (objA, objB) {
            return objA._name.toLocaleLowerCase().localeCompare(objB._name.toLocaleLowerCase());
        });
    } else if (categ.outerText === "dessert" || categ.id === "navDessert") {
        iteratorDishesInCategory = RestaurantsManager.getInstance().getDishesInCategory(catDessert, function (objA, objB) {
            return objA._name.toLocaleLowerCase().localeCompare(objB._name.toLocaleLowerCase());
        });
    }

    let div = createSection("dishesInCategory");
    for (let iterator of iteratorDishesInCategory) {
        let article = createDishCard(iterator);
        div.appendChild(article);
    }
}


function createElementCard(elem) {
    const article = document.createElement('article');
    article.classList.add("col-sm-3");

    const card = document.createElement('div');
    card.classList.add("card");
    card.classList.add("text-center");
    card.style.width = "15rem";

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBody.textContent = elem.name;

    card.appendChild(cardBody);
    article.appendChild(card);

    return article;
}


function createDishCard(dish) {
    const article = document.createElement('article');
    article.classList.add("col-sm-3");

    const card = document.createElement('div');
    card.classList.add("card");
    card.style.width = "20rem";
    
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const cardTextId = 'collapse-' + Math.random().toString(36).substr(2, 9);
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');

    cardText.classList.add('collapse');
    cardText.setAttribute('id', cardTextId);
    cardText.innerHTML = dish.toString();

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.classList.add('text-center');
    cardTitle.setAttribute('data-bs-toggle', 'collapse');
    cardTitle.setAttribute('data-bs-target', '#' + cardTextId);
    cardTitle.textContent = dish.name;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);

    card.appendChild(cardBody);
    article.appendChild(card);

    return article;
}

function createSection(id) {
    let section = divCentral.appendChild(document.createElement('section'));
    section.classList.add("container");
    section.classList.add("vh-50");
    section.setAttribute('id', id);

    let div = section.appendChild(document.createElement('div'));
    div.classList.add("row");
    div.classList.add("h-100");
    div.classList.add("justify-content-center");
    div.classList.add("align-items-center");

    return div;
}

function clearPage(){
    while (divCentral.firstChild) {
        divCentral.removeChild(divCentral.firstChild);
    }
}