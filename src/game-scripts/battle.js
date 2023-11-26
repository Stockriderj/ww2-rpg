import toast from "react-hot-toast";

const battleRound = (player, enemy, weapon) => {
  const playerWeapon = player[weapon] || "";
  const enemyWeapon = enemy["primaryWeapon"] || "";
  const playerWeaponName = player[weapon]?.name || "bare hands";
  const enemyWeaponName = enemy.primaryWeapon?.name || "bare hands";

  //   Initialize damage variables
  let playerCanAttack = true;
  let enemyCanAttack = true;

  //   RANGE - Characters with ranged weapons can attack without the enemy being able to deal damage back to them
  switch (`${playerWeapon?.ranged === true} ${enemyWeapon?.ranged === true}`) {
    case "true true":
      break; // Both sides have ranged weapons. Both can deal damage
    case "true false":
      enemyCanAttack = false; // The player has a ranged weapon and the enemy doesn't.
      break;
    case "false true":
      playerCanAttack = false; // Opposite of the one above
      break;
    case "false false":
      break; // Both sides are melee. Both can deal damage
  }

  let playerWon = false;

  let playerDamage = enemyCanAttack && enemy.calculateDamage("primaryWeapon");
  let enemyDamage = playerCanAttack && player.calculateDamage(weapon);
  if (enemyCanAttack) {
    player.takeDamage(playerDamage);
    toast(
      `The enemy dealt ${playerDamage} damage to you with their ${enemyWeaponName}.`
    );
  } else {
    toast(
      `You see the enemy running towards you with their ${enemyWeaponName} before ${
        playerWeapon.type === "Gun"
          ? "shooting them"
          : playerWeapon.type === "Grenade" && "blowing them up"
      } with your ${playerWeaponName}.`
    );
  }
  if (playerCanAttack) {
    enemy.takeDamage(enemyDamage);
    toast(
      `You dealt ${enemyDamage} damage to the enemy with your ${playerWeaponName}.`
    );
  } else {
    toast.error(
      `As you ran towards the enemy to attack with your ${playerWeaponName}, they shot you with their ${enemyWeaponName}, causing you to fall to the ground and crawl back to cover.`
    );
  }

  let updatedEnemy = enemy;
  // Check if enemy is defeated
  if (enemy.health <= 0) {
    console.log("Enemy defeated!");
    playerWon = true;
    player.addXp(enemy.maxHealth);
    toast(
      `+${enemy.maxHealth}XP - You have defeated an enemy with ${playerWeaponName}.`
    );

    updatedEnemy = null;
  }
  if (player.health <= 0) {
    toast.error(`You've been defeated by an enemy's ${enemyWeaponName}`);
  }

  return {updatedPlayer: player, updatedEnemy, playerWon};
};

export default battleRound;
