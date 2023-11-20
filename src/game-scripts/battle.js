import toast from "react-hot-toast";

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

const battleRound = (player, enemy, weapon) => {
  const playerDamage = enemy.calculateDamage("primaryWeapon");
  const enemyDamage = player.calculateDamage(weapon);
  let playerWon = false;

  player.takeDamage(playerDamage);
  enemy.takeDamage(enemyDamage);
  toast(
    `You dealt ${enemyDamage} damage to the enemy with your ${
      player[weapon]?.name || "bare hands"
    }.`
  );
  toast(
    `The enemy dealt ${playerDamage} damage to you with their ${
      enemy.primaryWeapon?.name || "bare hands"
    }.`
  );

  // Check if enemy is defeated
  if (enemy.health <= 0) {
    console.log("Enemy defeated!");
    playerWon = true;
    player.addXp(enemy.maxHealth);
    toast(
      `+${enemy.maxHealth}XP - You have defeated an enemy with ${
        player[weapon]?.name || "your bare hands"
      }.`
    );
  } else if (player.health <= 0) {
    toast("You've been defeated!");
  }

  return {updatedPlayer: player, updatedEnemy: enemy, playerWon};
};

export {Enemy, battleRound};
