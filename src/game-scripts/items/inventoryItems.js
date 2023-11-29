import toast from "react-hot-toast";

// Templates
/**
 * Creates a new item. Parameters must be placed in an object.
 * @param {number} quantity
 *
 * @returns {Object} an item
 */
export default class Item {
  constructor({quantity = 1}) {
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
  constructor({quantity = 1}) {
    super({quantity});
    this.name = "Medkit";
    this.type = "Medkit";

    this.actions = {
      use: {
        name: "Use Medkit",
        accepts: ["player"],
        run({player}) {
          if (this.quantity <= 0) return;
          if (player.health === player.maxHealth) {
            toast.error("You're already at full health.");
            return;
          }
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
    this.ranged = true;
    this.damage = 100;

    this.actions = {
      use: {
        name: "Throw Grenade",
        run() {
          if (this.quantity <= 0) return false;
          new Audio("sounds/grenade-explosion.mp3").play();
          this.quantity--;
          return true;
        },
      },
    };
    this.actions.use.run = this.actions.use.run.bind(this);
  }
}

export class BombingOrder extends Item {
  constructor({quantity}) {
    super({quantity});
    this.name = "Order - Carpet Bombing";
    this.type = "Order";
    this.subType = "Bombing";

    this.actions = {
      use: {
        name: "Use",
        accepts: ["player", "dispatch"],
        run({player, dispatch}) {
          if (this.quantity <= 0) return;
          this.quantity--;
          new Audio("sounds/carpet-bomb.mp3").play();

          const bombToast = toast.loading("(22sec) Bombing...");
          let timer = 22;
          const bombInterval = setInterval(() => {
            timer--;
            toast.loading(`(${timer}sec) Bombing...`, {
              id: bombToast,
            });
          }, 1000);
          setTimeout(() => {
            clearInterval(bombInterval);
            player.addXp(100000);
            toast.success("[+100000XP] - Target bombed!", {id: bombToast});
            dispatch({type: "update"});
          }, 22000);
        },
      },
    };
    this.actions.use.run = this.actions.use.run.bind(this);
  }
}

// GUNS

/**
 * Creates a new gun. Parameters must be placed in an object.
 * @param {number} damage How much damage the gun does
 * @param {number} ammunition How much ammunition the gun has on default
 * @param {number} quantity
 *
 * @returns {Object} A gun
 */
class Gun extends Item {
  constructor({damage, ammunition, quantity = 1}) {
    super({quantity});
    this.type = "Gun";
    this.ranged = true;
    this.playerSlot = "primaryWeapon";
    this.name = "Gun";
    this.damage = damage;
    this.ammunition = ammunition;

    this.shootSound = "sounds/bolt-action.mp3";
  }

  initActions(item) {
    item.actions = {
      use: {
        name: `Shoot`,
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
  constructor({quantity = 1}) {
    super({damage: 70, ammunition: 5, quantity});
    this.name = "Bolt Action Rifle";
    this.ranged = true;
    this.subType = "Bolt Action";

    this.shootSound = "sounds/bolt-action.mp3";
    this.initActions(this);
  }
}

export class Pistol extends Gun {
  constructor({quantity = 1}) {
    super({damage: 30, ammunition: 20, quantity});
    this.name = "Pistol";
    this.ranged = false;
    this.playerSlot = "secondaryWeapon";
    this.subType = "Pistol";

    this.shootSound = "sounds/pistol.mp3";
    this.initActions(this);
  }
}

// Items for referencing elsewhere
export const items = {
  Medkit,
  Grenade,
  "Bolt Action Rifle": BoltAction,
  Pistol,
  "Carpet Bombing Order": BombingOrder,
};
