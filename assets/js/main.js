"use strict";

/**
 * @description: Function logs the operations calls on the object
 * @argument: Function accepts a parmeter of type 'String'
 * @returns: Function returns boolean value
 * */
const logLocalStorage = (message) => {
  if (isValidString(message)) {
    let key = new Date().getTime();
    localStorage.setItem(key.toString(), message);
  }
};

// Utility methods

/**
 * @description: Function creates an immutable object
 * @argument: Function accepts a parameter of type 'Object'
 * @returns: Function returns boolean value
 * */
const createImmutableObject = (obj) => {
  if (isValidObject(obj)) {
    Object.freeze(obj);
    logLocalStorage("Created an immutable object.");
    return true;
  }
  logLocalStorage("Unable to create an immutable object!");
  return false;
};

/**
 * @description: Function checks if the string is valid or not
 * @argument: Function accepts a parameter of type 'String'
 * @returns: Function returns boolean value
 * */
const isValidString = (para) => {
  if (para && para.constructor.name === "String") return true;
  return false;
};

/**
 * @description: Function checks if the objects is valid or not
 * @argument: Function accepts a parameter of type 'Object'
 * @returns: Function returns boolean value
 * */
const isValidObject = (obj) => {
  if (obj && obj.constructor.name === "Object") return true;
  return false;
};

/**
 * @description: Function checks if the provided key is present in objects or not
 * @argument: Function accepts two parameters one of type 'Object' and second of type 'String'
 * @returns: Function returns boolean value
 * */
const isKeyExists = (obj, key) => {
  if (isValidObject(obj) && isValidString(key)) return obj.hasOwnProperty(key);
};

/**
 * @description: Function show the o/p of the passed object in the console
 * @argument: Function accepts a parmeter of type 'Object'
 * */
const show = (obj) => {
  if (isValidObject(obj)) {
    console.log(obj);
  } else
    console.log("Check if the provided paramter is an object and not null!");
};

/**
 * @description: Function created an object
 * @argument: Function accepts a parmeter of type 'Obejct'
 * @returns: Function returns object
 * */
const create = (obj) => {
  return obj;
};

/**
 * @description: Function return the object value at the specified key passed
 * @argument: Function accepts two parmeters of type 'Object' and type 'String'
 * @returns: Function returns any or null
 * */
const read = (obj, key) => {
  if (isKeyExists(obj, key)) {
    return obj[key];
  }
  return null;
};

/**
 * @description: Function update the passed object at specified key with the passed value
 * @argument: Function accepts three parmeters of type 'Object', type 'String' and type 'String'
 * @returns: Function returns boolean value
 * */
const update = (obj, key, value) => {
  let result = false;
  if (isKeyExists(obj, key)) {
    try {
      obj[key] = value;
    } catch (error) {
      let obj = {
        action: "Object update",
        time: new Date(),
        message: "Unable to update the property of an immutable object!",
        error,
      };
      let message = JSON.stringify(obj);
      logLocalStorage(message);
      result = false;
    }
    result = true;
  }
  return result;
};

/**
 * @description: Function deletes the passed object property with the specified key
 * @argument: Function accepts two parmeters of type 'Object' and type 'String'
 * @returns: Function returns boolean value
 * */
const deleteObject = (obj, key) => {
  let result;
  let message;
  if (isKeyExists(obj, key)) {
    result = delete obj[key];
    if (!flag) {
      message = "Unable to delete properties of an immutable object!";
    }
  } else {
    message = "Key does not exists!";
  }
  let obj1 = {
    action: "Object deletion",
    time: new Date(),
    message,
  };
  let state = JSON.stringify(obj1);
  logLocalStorage(state);
  return result;
};

/**
 * @description: Function adds new property with the specified key and value in the passed object
 * @argument: Function accepts three parmeters of type 'Object', type 'String' and type 'String'
 * @returns: Function returns boolean value
 * */
const extend = (obj, key, value) => {
  let result = false;
  if (isValidObject(obj)) {
    try {
      obj[key] = value;
    } catch (error) {
      let obj = {
        action: "Object extension",
        time: new Date(),
        message: "Unable to add properties to an immutable object!",
        error,
      };
      let message = JSON.stringify(obj);
      logLocalStorage(message);
      result = false;
    }
    result = true;
  }
  return result;
};

// Calls and creation

let newobj = create({ name: "Charizard" });
show(newobj); // o/p: {name: 'Charizard'}

createImmutableObject(newobj);
show(newobj); // o/p: {name: 'Charizard'}

update(newobj, "name", "Pikachu");
show(newobj); // o/p: {name: 'Charizard'}

let readResult = read(newobj, "name");
console.log(readResult); // o/p: Charizard

extend(newobj, "class", "Pokemon");
show(newobj); // o/p: {name: 'Charizard'}

deleteObject(newobj, "class");
show(newobj); // o/p: {name: 'Charizard'}
