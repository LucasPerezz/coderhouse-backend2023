const generateUserErrorInfo = (user) => {
    return `One or more properties were incomplete or not valid.
    List of required properties:
    * first_name: needs to be a string, received ${user.first_name}
    * last_name: needs to be a string, received ${user.last_name}
    * email: needs to be a string, received ${user.email}`;
};

const productNotFound = (id)=>`No se pudo encontrar producto con el ID ${id}`;

const productAlreadyExist = ()=>`El producto ya existe.`;

const idNotFound = (id)=>`No se encontro usuario con ID ${id}`;

const emailNotFound = (email)=>`No se encontro usuario con el email ${email}`;

const invalidPass = (email)=>`La contraseña ingresada no corresponde al email ${email}`;

const userNotFound = ()=>`El usuario que intenta enviar el mensaje no esta registrado.`;

const ticketAlreadyExist = (code)=> `El ticket con codigo ${code} ya esta cargado.`;

const cartNotFound = (id)=>`No se pudo encontrar carrito con el ID ${id}`;

const cartAlreadyExist = (id)=>`El carrito con ID ${id} ya existe.`;

const productNotInCart = (pid, cid)=>`El producto ${pid} no existe en el carrito ${cid}`;

const invalidId = (id, type)=>`El ID indicado no es valido, se esperaba un ${type} y se obtuvo un ${typeof id}`;

const idCantChange = ()=>`El ID no puede ser modificado`;

const missingData = (given, expected)=>{
    let message = `Uno o mas datos no fueron indicados.
    Listado de datos requeridos:`

    for(const prop in expected){
        message += `* ${prop}: Se esperaba un ${typeof expected[prop]}, se recibio ${typeof given[prop]}`;
    }

    return message;
}

module.exports = {
    generateUserErrorInfo,
    productNotFound,
    productNotInCart,
    productAlreadyExist,
    idNotFound,
    emailNotFound,
    invalidPass,
    userNotFound,
    ticketAlreadyExist,
    cartAlreadyExist,
    cartNotFound,
    invalidId,
    idCantChange,
    missingData
};