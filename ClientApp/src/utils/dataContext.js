export class GlobalSingletonObject {
  constructor() {
    if (!GlobalSingletonObject.instance) {
      // private method
      let privateObject = {};

      // public method
      this.set = function (key, value) {
        privateObject[key] = value;
      };
      this.get = function (key) {
        return privateObject[key];
      };

      GlobalSingletonObject.instance = this;
    }

    return GlobalSingletonObject.instance;
  }

  static getInstance() {
    return new GlobalSingletonObject();
  }
}
