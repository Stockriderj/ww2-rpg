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
 * @param {string} gun gun name
 * @param {number} quantity ammo count
 */
class Ammobox extends Item {
  constructor(gun, quantity) {
    super({quantity});
    this.type = "Ammobox";
    this.name = `${gun} Ammobox`;
    this.gun = gun;

    this.actions = {
      use: {
        name: "Use",
        accepts: ["player", "dispatch"],
        run({player, dispatch}) {
          player.addAmmo(this.gun, 1);
          this.quantity--;
          dispatch({type: "update"});
        },
      },
    };
    this.actions.use.run = this.actions.use.run.bind(this);
  }
}

export class BoltActionAmmobox extends Ammobox {
  constructor({quantity}) {
    super("Bolt Action Rifle", quantity);
  }
}

export class PistolAmmobox extends Ammobox {
  constructor({quantity}) {
    super("Pistol", quantity);
  }
}

/**
 * Creates a new gun. Parameters must be placed in an object.
 * @param {number} damage How much damage the gun does
 * @param {number} ammunition How much ammunition the gun has on default
 * @param {number} quantity
 *
 * @returns {Object} A gun
 */
class Gun extends Item {
  constructor({damage, ammunition, maxAmmoLoad, quantity = 1, shootSound}) {
    super({quantity});
    this.type = "Gun";
    this.ranged = true;
    this.playerSlot = "primaryWeapon";
    this.damage = damage;
    this.maxAmmoLoad = maxAmmoLoad;
    this.ammunition = ammunition;
    this.ammoLoad = 0;
    this.shootSound = shootSound;

    this.actions = {
      use: {
        name: "Shoot",
        accepts: ["target"],
        run() {
          if (this.ammoLoad > 0) {
            this.ammoLoad--;
            new Audio(this.shootSound).play();
            return true;
          } else {
            new Audio("sounds/no-ammo.mp3").play();
            toast.error("There isn't any ammo in the magazine.");
            return false;
          }
        },
      },
      reload: {
        name: "Reload",
        run() {
          if (this.ammoLoad === this.maxAmmoLoad)
            return toast.error("The magazine is already full.");
          if (this.ammunition === 0) return toast.error("You are out of ammo.");

          new Audio("sounds/reload.mp3").play();
          if (this.ammunition >= this.maxAmmoLoad) {
            this.ammoLoad = this.maxAmmoLoad;
            this.ammunition -= this.maxAmmoLoad;
          } else {
            this.ammoLoad = this.ammunition;
            this.ammunition = 0;
          }
        },
      },
    };
    this.actions.use.run = this.actions.use.run.bind(this);
    this.actions.reload.run = this.actions.reload.run.bind(this);
  }
}

export class BoltAction extends Gun {
  constructor({quantity = 1}) {
    super({
      damage: 70,
      ammunition: 5,
      quantity,
      maxAmmoLoad: 5,
      shootSound: "sounds/bolt-action.mp3",
    });
    this.name = "Bolt Action Rifle";
    this.ranged = true;
    this.subType = "Bolt Action";
  }
}

export class Pistol extends Gun {
  constructor({quantity = 1}) {
    super({
      damage: 30,
      ammunition: 20,
      quantity,
      maxAmmoLoad: 10,
      shootSound: "sounds/pistol.mp3",
    });
    this.name = "Pistol";
    this.ranged = false;
    this.playerSlot = "secondaryWeapon";
    this.subType = "Pistol";
  }
}

// Items for referencing elsewhere
export const items = {
  Medkit,
  Grenade,
  "Bolt Action Rifle": BoltAction,
  Pistol,
  "Bolt Action Rifle Ammobox": BoltActionAmmobox,
  "Pistol Ammobox": PistolAmmobox,
  "Carpet Bombing Order": BombingOrder,
};
