import toast from "react-hot-toast";
import {randomNumber} from "../utils/helpers";

const battleRound = (player, enemy, weapon) => {
  const playerWeapon = player[weapon] || "";
  const enemySlot = enemy["primaryWeapon"]
    ? "primaryWeapon"
    : "secondaryWeapon";
  const enemyWeapon = enemy[enemySlot] || "";
  const playerWeaponName = player[weapon]?.name || "bare hands";
  const enemyWeaponName = enemy[enemySlot]?.name || "bare hands";

  // enemy bot stuff
  if (enemyWeapon.ammoLoad === 0) {
    enemyWeapon.actions.reload.run();
    toast("You glimpse at your enemy and catch them reloading.");
  }

  //   Initialize damage variables
  let playerWon = false;
  let {damage: playerDamage, ranged: playerRanged} =
    player.calculateDamage(weapon);
  let {damage: enemyDamage, ranged: enemyRanged} =
    enemy.calculateDamage(enemySlot);

  //   RANGE - Characters with ranged weapons can attack without the enemy being able to deal damage back to them
  switch (`${playerRanged} ${enemyRanged}`) {
    case "true true":
      break; // Both sides have ranged weapons. Both can deal damage
    case "true false":
      enemyDamage = 0; // The player has a ranged weapon and the enemy doesn't.
      break;
    case "false true":
      playerDamage = 0; // Opposite of the one above
      break;
    case "false false":
      break; // Both sides are melee. Both can deal damage
  }

  if (enemyDamage > 0) {
    player.takeDamage(enemyDamage);
    toast(
      `The enemy dealt ${enemyDamage} damage to you with their ${enemyWeaponName}.`
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
  if (playerDamage > 0) {
    enemy.takeDamage(playerDamage);
    toast(
      `You dealt ${playerDamage} damage to the enemy with your ${playerWeaponName}.`
    );
  } else {
    toast.error(
      `As you run towards the enemy to attack with your ${playerWeaponName}, they shoot you with a ${enemyWeaponName}, causing you to fall to the ground and crawl back to cover.`
    );
  }

  let updatedEnemy = enemy;
  // Check if enemy is defeated
  if (enemy.health <= 0) {
    playerWon = true;

    const addedGold = randomNumber(10, 30);
    player.addGold(addedGold);
    player.addXp(enemy.maxHealth);
    toast(
      `[+${enemy.maxHealth}XP] [+${addedGold} Gold] - You have defeated an enemy with ${playerWeaponName}.`
    );
  }
  if (player.health <= 0) {
    toast.error(`You've been defeated by an enemy's ${enemyWeaponName}`);
  }

  return {updatedPlayer: player, updatedEnemy, playerWon};
};

export default battleRound;
