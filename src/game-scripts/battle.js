class Enemy {
  constructor(health, damage) {
    this.health = health;
    this.damage = damage;
  }

  takeDamage(amount) {
    this.health -= amount;
    if (this.health < 0) this.health = 0;
  }

  attack(player) {
    // Enemy attacks the player
    player.takeDamage(this.damage);
  }
}

const battleRound = (player, enemy, playerAction) => {
  // Player's action (e.g., shooting)
  if (playerAction === "shoot") {
    if (player.weapon.shoot()) {
      enemy.takeDamage(player.weapon.damage);
    } else {
      alert(
        "You're out of ammo! Good luck fighting. Maybe try a melee attack or sum 💀💀💀💀"
      );
    }
  }

  // Check if enemy is defeated
  if (enemy.health <= 0) {
    console.log("Enemy defeated!");
    return;
  }

  // Enemy's turn to attack
  enemy.attack(player);

  // Check player's health
  if (player.health <= 0) {
    console.log("You've been defeated!");
  }

  return {updatedPlayer: player, updatedEnemy: enemy};
};

export {Enemy, battleRound};
