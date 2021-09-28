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
  console.log(message);
};

// Custom event objects creation
const objectDisplayEvent = new Event("objectDisplayEvent");
const objectCreateEvent = new Event("objectCreateEvent");
const objectReadEvent = new Event("objectReadEvent");
const objectUpdateEvent = new Event("objectUpdateEvent");
const objectExtensionEvent = new Event("objectExtensionEvent");
const objectDeleteEvent = new Event("objectDeleteEvent");

// Initializing an object with reuired custom events and messages
const eventListObject = {
  objectDisplayEvent: "Display method called.",
  objectCreateEvent: "Create method called.",
  objectReadEvent: "Read method called.",
  objectUpdateEvent: "Update method called.",
  objectExtensionEvent: "Extend method called.",
  objectDeleteEvent: "Delete method called.",
};

// Adding defined event listeners to document object
const addCustomEventListener = () => {
  for (let i in eventListObject) {
    document.addEventListener(i, logLocalStorage(eventListObject[i]))
  }
};

// Function logs the passed parameter to the console
const logRemovedEvent = (para) => {
    console.log(`${para}: Event removed from the document object`);
}

// Removing custom eventlisteners from the documenmt object
const removeCustomEventListener = () => {
  for (let i in eventListObject) {
    document.removeEventListener(i, logRemovedEvent(i));
  }
};

// Utility methods

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
  return false;
};

/**
 * @description: Function show the o/p of the passed object in the console
 * @argument: Function accepts a parmeter of type 'Object'
 * */
const show = (obj) => {
  if (isValidObject(obj)) {
    console.log(obj);
    document.dispatchEvent(objectDisplayEvent);
  } else
    console.log("Check if the provided paramter is an object and not null!");
};

/**
 * @description: Function created an object 
 * @argument: Function accepts a parmeter of type 'Obejct'
 * @returns: Function returns object
 * */
const create = (obj) => {
  document.dispatchEvent(objectCreateEvent);
  return obj;
};

/**
 * @description: Function return the object value at the specified key passed
 * @argument: Function accepts two parmeters of type 'Object' and type 'String'
 * @returns: Function returns any or null
 * */
const read = (obj, key) => {
  if (isKeyExists(obj, key)) {
    document.dispatchEvent(objectDisplayEvent);
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
  if (isKeyExists(obj, key)) {
    obj[key] = value;
    document.dispatchEvent(objectUpdateEvent);
    return true;
  }
  return false;
};

/**
 * @description: Function deletes the passed object property with the specified key
 * @argument: Function accepts two parmeters of type 'Object' and type 'String'
 * @returns: Function returns boolean value
 * */
const deleteObject = (obj, key) => {
  if (isKeyExists(obj, key)) {
    delete obj[key];
    document.dispatchEvent(objectDeleteEvent);
    return true;
  }
  return false; 
};

/**
 * @description: Function adds new property with the specified key and value in the passed object
 * @argument: Function accepts three parmeters of type 'Object', type 'String' and type 'String'
 * @returns: Function returns boolean value
 * */
const extend = (obj, key, value) => {
  if (isValidObject(obj)) {
    obj[key] = value;
    document.dispatchEvent(objectExtensionEvent);
    return true;
  }
  return false;
};

// Calls and creation 

// Calling method to add custom eventlisteners
addCustomEventListener();

let newobj = create({ name: "Charizard" });
show(newobj); // o/p: {name: 'Charizard'}

update(newobj,"name","Pikachu");
show(newobj); // o/p: {name: 'Pikachu'}

let readResult = read(newobj,"name");
console.log(readResult) // o/p: Pikachu

extend(newobj,"class","Pokemon");
show(newobj); // o/p: {name: 'Pikachu', class: 'Pokemon'}

deleteObject(newobj,"class");
show(newobj); // o/p: {name: 'Pikachu'}

// Calling method to remove custom eventlisteners
removeCustomEventListener();
