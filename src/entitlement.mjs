export class Entitlement {
    constructor(json) {
      Object.assign(this, json);
    }

    get name()
    {
      return this.cn;
    }
  }
  