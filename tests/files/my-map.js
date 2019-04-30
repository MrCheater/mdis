const store = new Map();

class MyMap {
  // mdis-start get
  get (key) {
    return store.get(key);
  }
  // mdis-stop get
  // mdis-start set
  set (key, value) {
    return store.set(key, value);
  }
  // mdis-stop set
}

export default MyMap
