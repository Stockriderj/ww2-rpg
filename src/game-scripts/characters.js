class Player {
  constructor(weapon) {
    this.weapon = weapon;
    this.health = 100;
    this.stamina = 100;
  }

  takeDamage(amount) {
    this.health -= amount;
    if (this.health < 0) this.health = 0;
  }
}

export {Player};
