class Character {
  constructor({meleeDamage, level = 1, weapon = null}) {
    this.weapon = weapon;
    this.meleeDamage = meleeDamage;

    this.level = level;
    this.maxXp = 50 + (level - 1) * 50;
    this.xp = 0;

    this.maxHealth = 100 + (level - 1) * 10;
    this.health = this.maxHealth;
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
  constructor({meleeDamage, level = 1, weapon = null}) {
    super({meleeDamage, level, weapon});

    this.addedXp;
  }

  addXp(amount) {
    this.xp += amount;
    if (this.xp > this.maxXp) {
      this.level++;
      this.xp -= this.maxXp;
      this.maxXp = 50 + (this.level - 1) * 50;
    }

    this.addedXp = amount;
  }
}

export {Character, Player};
