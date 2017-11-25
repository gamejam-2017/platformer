class LocalStorageFacade {
  constructor(key) {
    this.__key = key;
  }

  hasData() {
    const data = localStorage.getItem(this.__key);
    return data !== null;
  }

  setData(data) {
    localStorage.setItem(this.__key, JSON.stringify(data));
  }

  getData() {
    const data = localStorage.getItem(this.__key);
    return JSON.parse(data) || {};
  }

  setItem(key, value) {
    const data = this.getData() || {};
    data[key] = value;
    this.setData(data);
  }

  getItem(key) {
    data = this.getData();
    return data[key] || {};
  }

  clearData() {
    localStorage.removeItem(this.__key);
  }
}

export default new LocalStorageFacade('gameState');
