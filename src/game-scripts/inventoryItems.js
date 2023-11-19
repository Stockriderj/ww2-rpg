// Templates
class Item {
  constructor(quantity) {
    this.quantity = quantity;
  }
}

class Gun extends Item {
  constructor(name, damage, ammunition, quantity) {
    super(quantity);
    this.type = "Gun";
    this.name = name;
    this.damage = damage;
    this.ammunition = ammunition;
  }

  shoot() {
    if (this.ammunition > 0) {
      this.ammunition--;
      return true;
    } else {
      alert("Bruh ur ass outta ammo better go REFILL bozo!");
      return false;
    }
  }
}

// not templates lmao
class BoltAction extends Gun {
  constructor(quantity) {
    super(quantity);
    this.name = "Bolt Action Rifle";
    this.damage = 70;
    this.ammunition = 20;
    this.quantity = quantity;
  }
}

export {BoltAction};
