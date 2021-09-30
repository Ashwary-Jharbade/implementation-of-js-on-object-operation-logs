const createObject = (obj) => {
  return obj;
};

const createImmutableObject = (obj) => {
  if (obj && obj.constructor.name === "Object") {
    Object.freeze(obj);
    return true;
  }
  return false;
};

const logLocalStorage = (para) => {
  let key = new Date().getTime();
  localStorage.setItem(key, para);
};

const newobj = createObject({ name: "Pikachu", class: "Pokemon" });

createImmutableObject(newobj);

const obj = new Proxy(newobj, {
  set: (target, key, value) => {
    let obj = {
      status: true,
      action: "set",
      target,
      key,
      value,
    };
    if (Object.isFrozen(target)) {
        obj.status = false;
        obj.message = "Immutable object cannot be updated!";
    } else {
        if (target.hasOwnProperty(key)) {
            target.key = value;
            obj.action = "update";
        }
        target[key] = value;
    }
    logLocalStorage(JSON.stringify(obj));
    return obj.status;
  },
  get: (target, key) => {
    let result = null;
    let obj = {
      status: "false",
      action: "get",
      target,
      key,
    };
    if (target.hasOwnProperty(key)) {
      obj.status = true;
      result = target[key];
    }
    logLocalStorage(JSON.stringify(obj));
    return result;
  },
  deleteProperty: (target, key) => {
    let obj = {
        status: false,
        action: "delete",
        target,
        key,
    };

    if (Object.isFrozen(target)) {
        obj.message = "Immutable object's property cannot be deleted";
    } else {
        if (target.hasOwnProperty(key)) {
            delete target.key;
            obj.status = true;
        }
    }
    logLocalStorage(JSON.stringify(obj));
    return obj.status;
  },
});


console.log(obj.name);
obj.name = "Charizard";
obj.type = "Fire";
console.log(obj.name, obj.type, obj.class);
console.log(delete obj.name);
