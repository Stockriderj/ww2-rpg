// Templates
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

    this.initActions(this);
  }

  initActions(item) {
    item.actions = {
      use: {
        name: "Use Medkit",
        accepts: ["player"],
        run({player}) {
          player.health = player.maxHealth;
          item.quantity--;
        },
      },
    };
  }
}
