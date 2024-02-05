import toast from "react-hot-toast";
import {checkProbability, randomNumber} from "../utils/helpers";

function battleRound(player, distance, enemy, weapon) {
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

  // damage calculation
  let playerWon = false;

  const {damage: playerDamage, flavorText: playerFlavor} = player.prepareAttack(
    weapon,
    distance
  );
  const {damage: enemyDamage, flavorText: enemyFlavor} = enemy.prepareAttack(
    enemySlot,
    distance
  );

  enemy.takeDamage(playerDamage);
  player.takeDamage(enemyDamage);

  // flavor texts
  toast(playerFlavor);
  toast(enemyFlavor);

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
