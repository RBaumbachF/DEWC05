class BaseException extends Error {
    constructor(message = "Default Message", fileName, lineNumber) {
        super(message, fileName, lineNumber);
        this.name = "MyError";

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BaseException);
        }
    }
}

// Excepción base del manager
class RestaurantException extends BaseException {
    constructor(message = "Error: Restaurant Exception.", fileName, lineNumber) {
        super(message, fileName, lineNumber);
        this.name = "RestaurantException";
    }
}

// Excepción que captura nulos y clases no válidas
class ErrorExistenceElementException extends RestaurantException {
    constructor(message) {
        super(message || "El objeto no puede ser nulo o no es del tipo correcto");
        this.name = "ErrorExistenceElementException"
    }
}

// Excepción que captura objetos no existentes
class ElementNotRecordedException extends RestaurantException {
    constructor(message) {
        super(message || "El objeto no existe");
        this.name = "ElementNotRecordedException"
        this.message = message;
    }
}

// Excepción que captura atributos obligatorios ausentes
class AttributeRequiredException extends RestaurantException {
    constructor(message) {
        super(message || "El atributo es obligatorio");
        this.name = "AttributeRequiredException"
        this.message = message;
    }
}

export {
    BaseException, RestaurantException, ErrorExistenceElementException, AttributeRequiredException, ElementNotRecordedException
};