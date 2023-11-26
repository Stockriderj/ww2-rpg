import toast from "react-hot-toast";
import {BoltAction, Pistol, items} from "./items/inventoryItems";
import {randomNumber} from "../utils/helpers";

/**
 * Creates a new character. Parameters must be placed in an object.
 * @param {number} meleeDamage How much damage the character deals without a weapon.
 * @param {level}
 */
class Character {
  constructor({
    meleeDamage,
    level = 1,
    primaryWeapon = null,
    secondaryWeapon = null,
    inventory = [],
  }) {
    this.primaryWeapon = primaryWeapon;
    this.secondaryWeapon = secondaryWeapon;
    this.meleeDamage = meleeDamage;
    this.inventory = inventory;

    this.level = level;
    this.maxXp = 100;
    this.xp = 0;

    this.maxHealth = 100 + (level - 1) * 10;
    this.health = this.maxHealth;
  }

  calculateDamage(weapon) {
    if (this.health === 0) return 0; // you cant deal damage if ur dead
    switch (weapon) {
      case "primaryWeapon":
        if (this.primaryWeapon?.actions.use.run()) {
          return this.primaryWeapon.damage;
        } else {
          return Math.round(this.meleeDamage * (this.health / 100));
        }
      case "secondaryWeapon":
        this.secondaryWeapon.actions.use.run();
        return this.secondaryWeapon.damage;
    }
  }

  attack(target) {
    target.health -= this.calculateDamage();
    if (target.health < 0) target.health = 0;
  }

  takeDamage(dmg) {
    this.health -= dmg;
    if (this.health < 0) this.health = 0;
  }

  equip(item, itemType) {
    this[itemType] !== item ? (this[itemType] = item) : (this[itemType] = null);
    new Audio("sounds/equip.mp3").play();
  }

  checkInventory() {
    this.inventory = this.inventory.filter(item => item.checkQuantity());
    if (this.secondaryWeapon?.quantity === 0) this.secondaryWeapon = null;
  }
}

class Player extends Character {
  constructor({
    meleeDamage,
    level = 1,
    primaryWeapon = null,
    secondaryWeapon = null,
    inventory = [],
  }) {
    super({meleeDamage, level, primaryWeapon, secondaryWeapon, inventory});

    this.addedXp;
    this.lastMaxXp = this.maxXp;
  }

  /**
   * Grants xp to the player. The leveling up system follows a Fibonacci sequence.
   * @param {number} amount
   */
  addXp(amount) {
    if (amount > 0) {
      this.xp += amount;

      while (this.xp >= this.maxXp) {
        this.level++;

        // Update maxXp based on Fibonacci sequence
        let newMaxXp = this.maxXp + this.lastMaxXp;
        this.lastMaxXp = this.maxXp;
        this.maxXp += newMaxXp;
      }

      this.addedXp = amount;
      new Audio("sounds/xp.mp3").play();
    }
  }

  addItem(itemName, quantity) {
    let existingItem = this.inventory.filter(item => {
      if (item?.name === itemName) return item;
    });

    existingItem.length
      ? (existingItem[0].quantity += quantity)
      : this.inventory.push(new items[itemName]({quantity}));
  }

  addAmmo(gunName, quantity) {
    let gun = this.inventory.filter(item => {
      if (item?.name === gunName) return item;
    });

    gun
      ? (gun[0].ammunition += quantity)
      : toast.error(
          `You would have gotten ${quantity} ${gunName} Ammo, but you don't have that gun! Don't worry, this feature will be fixed by Stockriderj in the future (when he stops being lazy)`
        );
  }
}

export function spawnRandomCharacter() {
  let enemyWeapon;
  switch (randomNumber(1, 5)) {
    case 5:
      enemyWeapon = new BoltAction({quantity: 1});
      break;
    case 4:
      enemyWeapon = new Pistol({quantity: 1});
      break;
    case 3:
    case 2:
    default:
      enemyWeapon = null;
  }

  return new Character({
    primaryWeapon: enemyWeapon,
    meleeDamage: 10,
  });
}

export {Character, Player};
