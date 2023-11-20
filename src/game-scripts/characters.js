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
  }) {
    this.primaryWeapon = primaryWeapon;
    this.secondaryWeapon = secondaryWeapon;
    this.meleeDamage = meleeDamage;

    this.level = level;
    this.maxXp = 50 + (level - 1) * 50;
    this.xp = 0;

    this.maxHealth = 100 + (level - 1) * 10;
    this.health = this.maxHealth;
  }

  calculateDamage(weapon) {
    if (this.health === 0) return 0; // you cant deal damage if ur dead
    switch (weapon) {
      case "primaryWeapon":
        if (this.primaryWeapon?.actions.shoot.run()) {
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
}

class Player extends Character {
  constructor({
    meleeDamage,
    level = 1,
    primaryWeapon = null,
    secondaryWeapon = null,
  }) {
    super({meleeDamage, level, primaryWeapon, secondaryWeapon});

    this.addedXp;
    this.lastMaxXp = this.maxXp;
  }

  /**
   * Grants xp to the player. The leveling up system follows a Fibonacci sequence.
   * @param {number} amount
   */
  addXp(amount) {
    this.xp += amount;

    while (this.xp >= this.maxXp) {
      this.level++;

      // Update maxXp based on Fibonacci sequence
      let newMaxXp = this.maxXp + this.lastMaxXp;
      this.lastMaxXp = this.maxXp;
      this.maxXp += newMaxXp;
    }

    this.addedXp = amount;
  }
}

export {Character, Player};
