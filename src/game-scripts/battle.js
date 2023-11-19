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
  const playerDamage = enemy.calculateDamage();
  const enemyDamage = player.calculateDamage();
  let playerWon = false;

  player.takeDamage(playerDamage);
  enemy.takeDamage(enemyDamage);

  // Check if enemy is defeated
  if (enemy.health <= 0) {
    console.log("Enemy defeated!");
    playerWon = true;
    player.addXp(enemy.maxHealth);
  } else if (player.health <= 0) {
    console.log("You've been defeated!");
  }

  return {updatedPlayer: player, updatedEnemy: enemy, playerWon};
};

export {Enemy, battleRound};
