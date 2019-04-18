const store = new Map();

class Raw {
  get (key) {
    return store.get(key);
  }
  set (key, value) {
    return store.set(key, value);
  }
}

export default Raw
