import toast from "react-hot-toast";
import Item from "./inventoryItems";

/**
 * Creates a new gun. Parameters must be placed in an object.
 * @param {number} damage How much damage the gun does
 * @param {number} ammunition How much ammunition the gun has on default
 * @param {number} quantity
 *
 * @returns {Object} A gun
 */
class Gun extends Item {
  constructor({damage, ammunition, quantity}) {
    super({quantity});
    this.type = "Gun";
    this.playerSlot = "weapon";
    this.name = "Gun";
    this.damage = damage;
    this.ammunition = ammunition;

    this.shootSound = "sounds/bolt-action.mp3";
  }

  initActions(item) {
    item.actions = {
      shoot: {
        name: `Shoot ${item.name}`,
        accepts: ["target"],
        run() {
          if (item.ammunition > 0) {
            item.ammunition--;
            new Audio(item.shootSound).play();
            return true;
          } else {
            new Audio("sounds/no-ammo.mp3").play();
            toast.error("You're out of ammo.");
            return false;
          }
        },
      },
    };
  }
}

export class BoltAction extends Gun {
  constructor({quantity}) {
    super({damage: 70, ammunition: 20, quantity});
    this.name = "Bolt Action Rifle";

    this.shootSound = "sounds/bolt-action.mp3";
    this.initActions(this);
  }
}

export class Pistol extends Gun {
  constructor({quantity}) {
    super({damage: 30, ammunition: 100, quantity});
    this.name = "Pistol";

    this.shootSound = "sounds/pistol.mp3";
    this.initActions(this);
  }
}
