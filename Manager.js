import {
    ErrorExistenceElementException, ElementNotRecordedException
} from './Exceptions.js';

import { Dish, Category, Allergen, Menu, Restaurant } from './Objects.js'

const instance = Symbol("instance");

class RestaurantsManager {

    [instance];
    constructor(systemName) {
        this.systemName = systemName;
        this._categories = [];
        this._allergens = [];
        this._dishes = [];
        this._menus = [];
        this._restaurants = [];

        Object.defineProperty(this, 'categories', {
            enumerable: true,
            get() {
                const categories = this._category;
                return {
                    *[Symbol.iterator]() {
                        for (const category of categories) {
                            yield category.category;
                        }
                    }
                }
            }
        });

        Object.defineProperty(this, 'allergens', {
            enumerable: true,
            get() {
                const allergens = this._allergens;
                return {
                    *[Symbol.iterator]() {
                        for (const allergen of allergens) {
                            yield allergen.allergen;
                        }
                    }
                }
            }
        });

        Object.defineProperty(this, 'dishes', {
            enumerable: true,
            get() {
                const dishes = this._dishes;
                return {
                    *[Symbol.iterator]() {
                        for (const dish of dishes) {
                            yield dish;
                        }
                    }
                }
            }
        });

        Object.defineProperty(this, 'menus', {
            enumerable: true,
            get() {
                const menus = this._menus;
                return {
                    *[Symbol.iterator]() {
                        for (const menu of menus) {
                            yield menu.menu;
                        }
                    }
                }
            }
        });
    }

    static getInstance() {
        if (!this[instance]) {
            this[instance] = new RestaurantsManager("singletonInstance");
        }
        return this[instance];
    }

    // Devuelve un iterador que permite recorrer las categorías del sistema
    * getterCategories() {
        for (const iterator of this._categories) {
            yield iterator;
        }
    }

    // Devuelve un iterador que permite recorrer los menus del sistema
    * getterMenus() {
        for (const iterator of this._menus) {
            yield iterator;
        }
    }

    // Devuelve un iterador que permite recorrer los alérgenos del sistema
    * getterAllergens() {
        for (const iterator of this._allergens) {
            yield iterator;
        }
    }

    // Devuelve un iterador que permite recorrer los restaurantes del sistema
    * getterRestaurants() {
        for (const iterator of this._restaurants) {
            yield iterator;
        }
    }

    // Función auxiliar que busca un objeto en una lista según su nombre
    findObjectInList(list, object) {
        return list.some(item => item._name === object.name);
    }

    // Añade una nueva categoría
    addCategory(...categories) {
        for (const category of categories) {
            if ((!(category instanceof Category)) || !category) {
                throw new Error('La categoría no puede ser null o no es un objeto Category');
            }
            if (this.findObjectInList(this._categories, category)) {
                throw new Error(`La categoría '${category.category}' ya existe`);
            }
            this._categories.push({
                category,
                dishes: []
            });
        }
        return this;
    }

    // Elimina una categoría
    removeCategory(...categories) {
        for (const category of categories) {
            const index = this._categories.findIndex(item => item.category === category);
            if (index !== -1) {
                this._categories.splice(index, 1);
                console.log(`Categoría: ${category.name} eliminada con éxito`);
            } else {
                throw new ElementNotRecordedException(`Categoría '${category.name}' no encontrada`);
            }
        }
        return this;
    }

    // Añade un nuevo menú
    addMenu(...menus) {
        for (const menu of menus) {
            if ((!(menu instanceof Menu)) || !menu) {
                throw new Error('El menú no puede ser null o no es un objeto Menu');
            }
            if (this.findObjectInList(this._menus, menu)) {
                throw new Error(`El menú '${menu.name}' ya existe`);
            }
            this._menus.push({
                menu,
                dishes: [],
            });
        }
        return this;
    }

    // Elimina un menú
    removeMenu(...menus) {
        for (const menu of menus) {
            const index = this._menus.findIndex(item => item.menu === menu);
            if (index !== -1) {
                this._menus.splice(index, 1);
                console.log(`Menú '${menu.name}' eliminado con éxito`);
            } else {
                throw new Error(`Menú '${menu.name}' no encontrado`);
            }
        }
        return this;
    }

    // Añade un nuevo alérgeno
    addAllergen(...allergens) {
        for (const allergen of allergens) {
            if ((!(allergen instanceof Allergen)) || !allergen) {
                throw new Error('El alérgeno no puede ser null o no es un objeto Allergen');
            }
            if (this.findObjectInList(this._allergens, allergen)) {
                throw new Error(`El alérgeno '${allergen.name}' ya existe`);
            }
            this._allergens.push({
                allergen,
                dishes: [],
            });
        }
        return this;
    }

    // Elimina un alérgeno
    removeAllergen(...allergens) {
        for (const allergen of allergens) {
            const index = this._allergens.findIndex(item => item.allergen._name === allergen.name);
            if (index !== -1) {
                this._allergens.splice(index, 1);
                console.log(`Alérgeno '${allergen}' eliminado con éxito`);
            } else {
                console.log(`Alérgeno '${allergen}' no encontrado`);
            }
        }
        return this;
    }

    // Añade un nuevo plato
    addDish(...dishes) {
        for (const dish of dishes) {
            if ((!(dish instanceof Dish)) || !dish) {
                throw new Error('El plato no puede ser null o no es un objeto Dish');
            }
            if (this.findObjectInList(this._dishes, dish)) {
                throw new Error(`El plato '${dish.name}' ya existe`);
            }
            this._dishes.push(dish);
        }
        return this;
    }

    // Elimina un plato
    removeDish(...dishes) {
        for (const dish of dishes) {
            const index = this._dishes.findIndex(d => d.name === dish.name);
            if (index !== -1) {
                const removedDish = this._dishes.splice(index, 1)[0];
                console.log(`Plato '${removedDish.name}' eliminado con éxito`);
            } else {
                console.log(`Plato '${dish.name}' no encontrado`);
            }
        }
        return this;

    }

    // Añade un restaurante
    addRestaurant(...restaurants) {
        for (const restaurant of restaurants) {
            if ((!(restaurant instanceof Restaurant)) || !restaurant) {
                throw new Error('El restaurante no puede ser null o no es un objeto Restaurant');
            }
            if (this.findObjectInList(this._restaurants, restaurant)) {
                throw new Error(`El restaurante '${restaurant.name}' ya existe`);
            }
            this._restaurants.push(restaurant);
        }
        return this;
    }

    // Elimina un restaurante
    removeRestaurant(...restaurants) {
        for (const restaurant of restaurants) {
            const index = this._restaurants.findIndex(r => r.name === restaurant.name);
            if (index !== -1) {
                this._restaurants.splice(index, 1);
                console.log(`Restaurante '${restaurant.name}' eliminado con éxito`);
            } else {
                console.log(`Restaurante '${restaurant.name}' no encontrado`);
            }
        }
        return this;
    }

    // Asigna un plato a una categoría
    // Si el objeto Category o Dish no existen se añaden al sistema
    assignCategoryToDish(category, ...dishes) {
        // Buscar la categoría en la lista de categorías por su nombre
        const foundCategory = this._categories.find(c => c.category.name === category.name);

        if (!foundCategory) {
            // Si la categoría no existe, la agregamos
            this.addCategory(category);
        }

        for (const dish of dishes) {
            // Verificar si el plato ya está asignado a esta categoría
            const existingDish = foundCategory.category.dishes?.find(d => d.name === dish.name);
            if (!existingDish) {
                // Asignar el plato a la categoría
                if (!foundCategory.category.dishes) foundCategory.category.dishes = [];
                foundCategory.category.dishes.push(dish);
                console.log(`Plato '${dish.name}' asignado a la categoría '${category.name}' con éxito`);
            } else {
                console.log(`El plato '${dish.name}' ya está asignado a la categoría '${category.name}'`);
            }
        }

        return this;
    }

    // Desasigna un alérgeno
    deassignCategoryToDish(category, ...dishes) {
        // Buscar la categoría en la lista de categorías por su nombre
        const foundCategory = this._categories.find(c => c.category.name === category.name);

        if (!foundCategory) {
            console.log(`Error: La categoría '${category.name}' no existe`);
            return this;
        }

        for (const dish of dishes) {
            // Buscar el plato en la lista de platos de la categoría por su nombre
            const index = foundCategory.dishes.findIndex(d => d.name === dish.name);

            if (index === -1) {
                console.log(`Error: El plato '${dish.name}' no está asignado a la categoría '${category.name}'`);
            } else {
                // Remover el plato de la lista de platos de la categoría
                foundCategory.dishes.splice(index, 1);
                console.log(`Plato '${dish.name}' eliminado de la categoría '${category.name}' con éxito`);
            }
        }

        return this;
    }

    // Asigna un alérgeno a un plato
    // Si algún argumento no existe se añade al sistema
    assignAllergentoDish(allergen, ...dishes) {
        // Buscar el alérgeno en la lista de alérgenos por su nombre
        const foundAllergen = this._allergens.find(a => a.allergen.name === allergen.name);

        if (!foundAllergen) {
            console.log(`Error: El alérgeno '${allergen.name}' no existe`);
            return this;
        }

        for (const dish of dishes) {
            // Verificar si el plato ya está asignado a esta categoría
            const existingDish = foundAllergen.allergen.dishes?.find(d => d.name === dish.name);
            if (!existingDish) {
                // Asignar el plato a la categoría
                if (!foundAllergen.allergen.dishes) foundAllergen.allergen.dishes = [];
                foundAllergen.allergen.dishes.push(dish);
                console.log(`Plato '${dish.name}' asignado al alérgerno '${allergen.name}' con éxito`);
            } else {
                console.log(`El plato '${dish.name}' ya está asignado al alérgerno '${allergen.name}'`);
            }
        }

        return this;
    }

    // Desasigna un alérgeno
    deassignAllergenToDish(allergen, ...dishes) {

        // Buscar el alérgeno en la lista de alérgenos por su nombre
        const foundAllergen = this._allergens.find(a => a.allergen.name === allergen.name);

        if (!foundAllergen) {
            console.log(`Error: El alérgeno '${allergen.name}' no existe`);
            return this;
        }

        for (const dish of dishes) {
            // Buscar el plato en la lista de platos por su nombre
            const foundDish = this._dishes.find(d => d.name === dish.name);

            if (!foundDish) {
                console.log(`Error: El plato '${dish.name}' no existe`);
            } else {
                // Verificar si el alérgeno está asignado al plato
                const index = foundDish.allergens.findIndex(a => a.allergen.name === allergen.name);

                if (index === -1) {
                    console.log(`Error: El alérgeno '${allergen.name}' no está asignado al plato '${dish.name}'`);
                } else {
                    // Remover el alérgeno del plato
                    foundDish.allergens.splice(index, 1);
                    console.log(`Alérgeno '${allergen.name}' eliminado del plato '${dish.name}' con éxito`);
                }
            }
        }

        return this;
    }

    // Asigna un plato a un menú
    // Si algún argumento no existe se añade al sistema
    assignDishtoMenu(menu, ...dishes) {
        // Buscar el menú en la lista de menús por su nombre
        const foundMenu = this._menus.find(m => m.menu.name === menu.name);

        if (!foundMenu) {
            console.log(`Error: El menú '${menu.name}' no existe`);
            return this;
        }

        for (const dish of dishes) {
            // Buscar el plato en la lista de platos por su nombre
            const foundDish = this._dishes.find(d => d.name === dish.name);

            if (!foundDish) {
                console.log(`Error: El plato '${dish.name}' no existe`);
            } else {
                // Verificar si el plato ya está en el menú
                if (!foundMenu.menu.dishes) foundMenu.menu.dishes = [];
                if (foundMenu.menu.dishes.includes(foundDish)) {
                    console.log(`El plato '${dish.name}' ya está en el menú '${menu.name}'`);
                } else {
                    // Asignar el plato al menú
                    foundMenu.menu.dishes.push(foundDish);
                    console.log(`Plato '${dish.name}' asignado al menú '${menu.name}' con éxito`);
                }
            }
        }

        return this;
    }

    // Desasigna un plato de un menú
    deassignDishToMenu(menu, ...dishes) {
        // Buscar el menú en la lista de menús por su nombre
        const foundMenu = this._menus.find(m => m.menu.name === menu.name);

        if (!foundMenu) {
            console.log(`Error: El menú '${menu.name}' no existe.`);
            return this;
        }

        for (const dish of dishes) {
            // Buscar el plato en la lista de platos por su nombre
            const foundDish = this._dishes.find(d => d.name === dish.name);

            if (!foundDish) {
                console.log(`Error: El plato '${dish.name}' no existe.`);
            } else {
                // Verificar si el plato está en el menú
                const index = foundMenu.dishes.findIndex(d => d.name === dish.name);

                if (index === -1) {
                    console.log(`Error: El plato '${dish.name}' no está en el menú '${menu.name}'.`);
                } else {
                    // Remover el plato del menú
                    foundMenu.dishes.splice(index, 1);
                    console.log(`Plato '${dish.name}' eliminado del menú '${menu.name}' con éxito.`);
                }
            }
        }

        return this;
    }

    // Intercambia las posiciones de dos platos en un menú
    changeDishesPositionsInMenu(menu, dish1, dish2) {
        // Buscar el menú en la lista de menús por su nombre
        const foundMenu = this._menus.find(m => m.menu.name === menu.name);

        if (!foundMenu) {
            console.log(`Error: El menú '${menu.name}' no existe.`);
            return this;
        }

        // Buscar los platos en el menú por su nombre
        const foundDish1 = foundMenu.dishes.find(d => d.name === dish1.name);
        const foundDish2 = foundMenu.dishes.find(d => d.name === dish2.name);

        if (!foundDish1 || !foundDish2) {
            console.log(`Error: Uno o ambos platos no existen en el menú '${menu.name}'`);
            return this;
        }

        // Obtener las posiciones de los platos en el menú
        const index1 = foundMenu.dishes.findIndex(d => d.name === dish1.name);
        const index2 = foundMenu.dishes.findIndex(d => d.name === dish2.name);

        // Intercambiar las posiciones de los platos en el menú
        [foundMenu.dishes[index1], foundMenu.dishes[index2]] = [foundMenu.dishes[index2], foundMenu.dishes[index1]];

        console.log(`Se intercambiaron las posiciones de los platos '${dish1.name}' y '${dish2.name}' en el menú '${menu.name}'`);

        return this;

    }

    // Obtiene un iterador con la relación de los platos a una categoría
    // El iterador puede estar ordenado
    * getDishesInCategory(category, orderFunction) {
        // Verificar si el parámetro category es nulo o no está registrada
        if (!category) {
            throw new Error("Category es null o no está registrada");
        }

        // Buscar la categoría por su nombre
        const foundCategory = this._categories.find(cat => cat.category.name === category.name);

        if (foundCategory) {
            const array = foundCategory.category.dishes;
            if (array.length === 0) {
                throw new ErrorExistenceElementException("No existen platos en esta categoría");
            } else {
                // Ordenar el array si se proporciona una función de ordenamiento
                if (orderFunction) {
                    array.sort(orderFunction);
                }
                // Iterar sobre los platos usando yield
                for (const dish of array) {
                    yield dish;
                }
            }
        } else {
            throw new ElementNotRecordedException("La categoría no existe");
        }
    }

    * getDishesInMenu(menu, orderFunction) {
        // Verificar si el menú es nulo o no está registrado
        if (!menu) {
            throw new Error("Menú es null o no está registrado");
        }

        // Buscar el menú en la lista de menús por su nombre
        const foundMenu = this._menus.find(m => m.menu.name === menu.name);

        if (foundMenu) {
            const array = foundMenu.menu.dishes;
            if (array.length === 0) {
                throw new ErrorExistenceElementException("No existen platos en este menú");
            } else {
                // Ordenar el array si se proporciona una función de ordenamiento
                if (orderFunction) {
                    array.sort(orderFunction);
                }
                // Iterar sobre los platos usando yield
                for (const dish of array) {
                    yield dish;
                }
            }
        } else {
            throw new ElementNotRecordedException("El menú no existe");
        }
    }

    // Obtiene un iterador con los platos que tiene un determinado alérgeno
    // El iterador puede estar ordenado
    * getDishesWithAllergen(allergen, orderFunction) {
        // Verificar si el parámetro allergen es nulo o no está registrado
        if (!allergen) {
            throw new Error("Alérgeno es null o no está registrado");
        }

        // Buscar el alérgeno en la lista de alérgenos por su nombre
        const foundAllergen = this._allergens.find(a => a.allergen.name === allergen.name);

        if (foundAllergen) {
            const array = foundAllergen.allergen.dishes;
            if (array.length === 0) {
                throw new ErrorExistenceElementException("No existen platos con este alérgeno");
            } else {
                // Ordenar el array si se proporciona una función de ordenamiento
                if (orderFunction) {
                    array.sort(orderFunction);
                }
                // Iterar sobre los platos usando yield
                for (const dish of array) {
                    yield dish;
                }
            }
        } else {
            throw new ElementNotRecordedException("El alérgeno no existe");
        }
    }

    // Obtiene un iterador que cumpla un criterio concreto en base a una función de callback
    // El iterador puede estar ordenado
    * findDishes(dish, functionfind, orderFunction) {

        if (!(dish instanceof Dish) || !dish) {
            throw new ErrorExistenceElementException(`Dish es null o no está registrado`);
        }

        const findDishes1 = this._dishes.filter(functionfind);

        findDishes1.sort(orderFunction);

        for (const dish of findDishes1) {
            yield dish;
        }
    }

    // Crea un nuevo plato
    createDish(name, description, ingredients, image) {
        const dish = new Dish(name, description, ingredients, image);
        return dish;
    }

    // Crea un nuevo menú
    createMenu(name, description) {
        const menu = new Menu(name, description);
        return menu;
    }

    // Crea un nuevo alérgeno
    createAllergen(name, description) {
        const allergen = new Allergen(name, description);
        return allergen;
    }

    // Crea una nueva categoría
    createCategory(name, description) {
        const category = new Category(name, description);
        return category;
    }

    // Crea un nuevo restaurante
    createRestaurant(name, description, location) {
        const restaurant = new Restaurant(name, description, location);
        return restaurant;
    }

}

export { RestaurantsManager };