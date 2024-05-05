import { AttributeRequiredException } from "./Exceptions.js";

class Dish {
    constructor(name) {
        if (!name) {
            throw new AttributeRequiredException("Atributo 'name' obligatorio");
        }

        this._name = name;
        this.description = "No existe descripción";
        this.ingredients = "No existen ingredientes";
        this.image = "No existe imagen";

        Object.defineProperty(this, 'name', {
            enumerable: true,
            get() {
                return this._name;
            },
            set(value) {
                this._name = value;
            },
        });
    }

    toString() {
        return `<b>Nombre</b>: ${this._name}</br><b>Descripción</b>: ${this.description}</br><b>Ingredientes</b>: ${this.ingredients}</br><b>Imagen</b>: ${this.image} `;
    }
}

class Category {
    constructor(name) {
        if (!name) {
            throw new AttributeRequiredException("Atributo 'name' obligatorio");
        }

        this._name = name;
        this.description = "No existe descripción";

        Object.defineProperty(this, 'name', {
            enumerable: true,
            get() {
                return this._name;
            },
            set(value) {
                this._name = value;
            },
        });
    }

    toString() {
        return `Nombre: ${this._name}, Descripción: ${this.description}`;
    }
}


class Allergen {
    constructor(name) {
        if (!name) {
            throw new AttributeRequiredException("Atributo 'name' obligatorio");
        }

        this._name = name;
        this.description = "No existe descripción";

        Object.defineProperty(this, 'name', {
            enumerable: true,
            get() {
                return this._name;
            },
            set(value) {
                this._name = value;
            },
        });
    }

    toString() {
        return `Nombre: ${this._name}, Descripción: ${this.description}`;
    }
}

class Menu {
    constructor(name) {
        if (!name) {
            throw new AttributeRequiredException("Atributo 'name' obligatorio");
        }

        this._name = name;
        this.description = "No existe descripción";

        Object.defineProperty(this, 'name', {
            enumerable: true,
            get() {
                return this._name;
            },
            set(value) {
                this._name = value;
            },
        });
    }

    toString() {
        return `Nombre: ${this._name}, Descripción: ${this.description}`;
    }

}

class Restaurant {
    constructor(name) {
        if (!name) {
            throw new AttributeRequiredException("Atributo 'name' obligatorio");
        }

        this._name = name;
        this.description = "No existe descripción";
        this.location = "No existe ubicación";

        Object.defineProperty(this, 'name', {
            enumerable: true,
            get() {
                return this._name;
            },
            set(value) {
                this._name = value;
            },
        });
    }

    toString() {
    return `<b>Nombre</b>: ${this._name}</br><b>Descripción</b>: ${this.description}</br><b>Ubicación</b>: ${this.location}`;
    }
}

class Coordinate {
    constructor(latitude, longitude) {
        if (!latitude) {
            throw new AttributeRequired("Atributo 'latitude' obligatorio");
        }
        if (!longitude) {
            throw new AttributeRequired("Atributo 'longitude' obligatorio");
        }

        this._latitude = latitude;
        this._longitude = longitude;

        Object.defineProperty(this, 'latitude', {
            enumerable: true,
            get() {
                return this._latitude;
            },
            set(value) {
                this._latitude = value;
            },
        });

        Object.defineProperty(this, 'longitude', {
            enumerable: true,
            get() {
                return this._longitude;
            },
            set(value) {
                this._longitude = value;
            },
        });
    }

    toString() {
        return `Latitud: ${this._latitude}, Longitud: ${this._longitude}`;
    }
}

export { Dish, Category, Allergen, Menu, Restaurant, Coordinate };