// Templates

import toast from "react-hot-toast";

/**
 * Creates a new item. Parameters must be placed in an object.
 * @param {number} quantity
 *
 * @returns {Object} an item
 */
export default class Item {
  constructor({quantity}) {
    this.quantity = quantity;
  }

  checkQuantity() {
    return !(this.quantity <= 0);
  }
}

// items
/**
 * Creates a new medkit. Parameters must be placed in an object.
 * @param {number} quantity
 *
 * @returns {Object} A function to heal a player (which must be passed into the function)
 */
export class Medkit extends Item {
  constructor({quantity}) {
    super({quantity});
    this.name = "Medkit";

    this.actions = {
      use: {
        name: "Use Medkit",
        accepts: ["player"],
        run({player}) {
          if (this.quantity <= 0) return;
          player.health = player.maxHealth;
          this.quantity--;
          toast(
            "You used a medkit and healed yourself back up to full health."
          );
        },
      },
    };
    this.actions.use.run = this.actions.use.run.bind(this);
  }
}

export class Grenade extends Item {
  constructor({quantity}) {
    super({quantity});
    this.name = "Grenade";
    this.type = "Grenade";
    this.playerSlot = "secondaryWeapon";
    this.damage = 100;

    this.actions = {
      use: {
        name: "Throw Grenade",
        run() {
          if (this.quantity <= 0) return;
          this.quantity--;
        },
      },
    };
    this.actions.use.run = this.actions.use.run.bind(this);
  }
}
