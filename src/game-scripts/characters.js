class Character {
  constructor(meleeDamage, weapon = null) {
    this.health = 100;
    this.stamina = 100;
    this.weapon = weapon;
    this.meleeDamage = meleeDamage;
  }

  calculateDamage() {
    if (this.health === 0) return 0; // you cant deal damage if ur dead
    if (this.weapon?.shoot()) {
      return this.weapon.damage;
    } else {
      return this.meleeDamage * (this.health / 100);
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
  constructor(meleeDamage, weapon = null) {
    super(health);
    super(stamina);
    super(weapon);
    super(meleeDamage);
  }
}

export {Character, Player};
