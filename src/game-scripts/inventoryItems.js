// Templates
class Item {
  constructor({quantity}) {
    this.quantity = quantity;
  }
}

class Gun extends Item {
  constructor({damage, ammunition, quantity}) {
    super({quantity});
    this.type = "Gun";
    this.name = "Gun";
    this.damage = damage;
    this.ammunition = ammunition;

    this.shootSound = "sounds/bolt-action.mp3";
  }

  shoot() {
    if (this.ammunition > 0) {
      this.ammunition--;
      new Audio(this.shootSound).play();
      return true;
    } else {
      new Audio("sounds/no-ammo.mp3").play();
      // alert(
      //   "You're out of ammo! Good luck fighting. Maybe try a melee attack or sum 💀💀💀💀"
      // );
      return false;
    }
  }
}

// not templates lmao
class BoltAction extends Gun {
  constructor({quantity}) {
    super({damage: 70, ammunition: 20, quantity});
    this.name = "Bolt Action Rifle";

    this.shootSound = "sounds/bolt-action.mp3";
  }
}

class Pistol extends Gun {
  constructor({quantity}) {
    super({damage: 30, ammunition: 100, quantity});
    this.name = "Pistol";

    this.shootSound = "sounds/pistol.mp3";
  }
}

export {BoltAction, Pistol};
