import toast from "react-hot-toast";
import {BoltAction, Pistol, items} from "./items/inventoryItems";
import {checkProbability, randomNumber} from "../utils/helpers";

/**
 * Creates a new character. Parameters must be placed in an object.
 * @param {number} meleeDamage How much damage the character deals without a weapon.
 * @param {level}
 */
class Character {
  constructor({
    name = "NPC",
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
    this.name = name;

    this.level = level;
    this.maxXp = 100;
    this.xp = 0;

    this.maxHealth = 100 + (level - 1) * 10;
    this.health = this.maxHealth;
  }

  prepareAttack(weaponSlot, range) {
    function checkMiss(weaponRange) {
      console.log((range / weaponRange) * 0.95 * 100);
      return checkProbability((range / weaponRange) * 0.95 * 100); // super complex range formula :o
    }

    // can't directly deal damage. they must deal at the same time
    const weapon = this[weaponSlot];
    console.log(weapon);
    if (this.health === 0) return {flavorText: ""}; // you cant deal damage if dead
    switch (weapon.type) {
      case "Gun":
      case "Grenade":
        const flavorTexts = {
          Gun: {
            miss: `[${this.name}] Shoots and misses.`,
            hit: `[${this.name}] Fires their ${weapon.name}, dealing ${weapon.damage} damage.`,
          },
          Grenade: {
            miss: `[${this.name}] Chucks a ${weapon.name}. Misses by a long shot.`,
            hit: `[${this.name}] Throws their ${weapon.name}. Boom!`,
          },
        };

        if (weapon.actions.use.run()) {
          // // If the weapon is out range
          if (checkMiss(weapon.range)) {
            return {
              damage: 0,
              flavorText: flavorTexts[weapon.type].miss,
            };
          } else {
            return {
              damage: weapon.damage,
              flavorText: flavorTexts[weapon.type].hit,
            };
          }
        }

      default: // melee weapon
        if (
          (weapon.type === "Melee" && range > weapon.range) ||
          (weapon.type === "Gun" && range > 3)
        ) {
          // if out of range
          return {
            damage: 0,
            flavorText: `[${this.name}] Swings their ${weapon.name} uselessly as the enemy taunts them from ${range} meters away.`,
          };
        } else {
          // if in range
          if (weapon.type === "Melee") {
            return {
              damage: weapon.damage,
              flavorText: `[${this.name}] Swings their ${weapon.name}, dealing ${weapon.damage} damage.`,
            };
          } else if (weapon.type === "Gun") {
            return {
              damage: Math.round(this.meleeDamage * (this.health / 100)),
              flavorText: `[${this.name}] Presses the trigger and hears a clicking sound. Frustrated, they smack the enemy with their ${weapon.name} instead, dealing ${damage} damage.`,
            };
          }
        }
    }
  }

  // attack(target) {
  //   target.health -= this.calculateDamage();
  //   if (target.health < 0) target.health = 0;
  // }

  takeDamage(dmg) {
    this.health -= dmg;
    if (this.health < 0) this.health = 0;
  }

  equip(item, itemType) {
    this[itemType] !== item ? (this[itemType] = item) : (this[itemType] = null);
    new Audio("sounds/reload.mp3").play();
  }

  checkInventory() {
    this.inventory = this.inventory.filter(item => item.checkQuantity());
    if (this.secondaryWeapon?.quantity === 0) this.secondaryWeapon = null;
  }
}

class Player extends Character {
  constructor({
    meleeDamage,
    gold,
    level = 1,
    primaryWeapon = null,
    secondaryWeapon = null,
    inventory = [],
  }) {
    super({
      name: "Player",
      meleeDamage,
      level,
      primaryWeapon,
      secondaryWeapon,
      inventory,
    });

    this.gold = gold;
    this.addedXp;
    this.lastMaxXp = this.maxXp;
  }

  /**
   * Grants xp to the player. The leveling up system follows a Fibonacci sequence.
   * @param {number} amount
   */
  addGold(amount) {
    if (amount > 0) {
      this.gold += amount;
      new Audio("sounds/xp.mp3").play();
    }
  }

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

  // If "items[itemName] is not a constructor" is thrown, then the item is not listed in items array
  addItem(itemName, quantity = 1) {
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

    gun.length
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
      enemyWeapon = new BoltAction({quantity: 1});
  }

  return new Character({
    primaryWeapon: enemyWeapon,
    inventory: [enemyWeapon],
    meleeDamage: 10,
  });
}

export {Character, Player};
