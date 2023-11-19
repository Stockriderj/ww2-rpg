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

    this.shootSound = new Audio("sounds/bolt-action.mp3");
  }

  shoot() {
    if (this.ammunition > 0) {
      this.ammunition--;
      this.shootSound.play();
      return true;
    } else {
      alert(
        "You're out of ammo! Good luck fighting. Maybe try a melee attack or sum 💀💀💀💀"
      );
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

    this.shootSound = new Audio("sounds/bolt-action.mp3");
  }
}

class Pistol extends Gun {
  constructor(quantity) {
    super(quantity);
    this.name = "Pistol";
    this.damage = 30;
    this.ammunition = 100;

    this.shootSound = new Audio("sounds/pistol.mp3");
  }
}

export {BoltAction, Pistol};
