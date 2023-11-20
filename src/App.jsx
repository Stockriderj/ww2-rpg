import React, {useState} from "react";
import GlobalStyles from "./styles/GlobalStyles";
import toast, {Toaster} from "react-hot-toast";

// Components
import HUD from "./game-ui/HUD";
import Inventory from "./game-ui/Inventory";
import Button from "./game-ui/Button";

// Game scripts
import battleRound from "./game-scripts/battle";
import {Character} from "./game-scripts/characters";
import {usePlayer} from "./context/PlayerContext";
import preloadSounds from "./game-scripts/preload-sounds";
import {randomNumber} from "./utils/helpers";
import {BoltAction, Pistol} from "./game-scripts/items/guns";
import {Medkit} from "./game-scripts/items/inventoryItems";
import scavenge from "./game-scripts/scavenge";

preloadSounds();

function App() {
  const {player, setPlayer, updatePlayer} = usePlayer();
  const [enemy, setEnemy] = useState(new Character({meleeDamage: 10})); // Example enemy

  const [showInventory, setShowInventory] = useState(false);

  const handleBattle = weapon => {
    const {updatedEnemy, playerWon} = battleRound(player, enemy, weapon);

    updatePlayer();
    setEnemy(updatedEnemy); // Update enemy state

    if (playerWon) {
      player.inventory.map(item => {
        if (item?.type === "Gun") {
          const newAmmo = randomNumber(0, 10);
          if (newAmmo === 0) return;
          toast(
            `+${newAmmo} ${item.name} Ammo - You found some ammo in the enemy's bag.`
          );
          item.ammunition += newAmmo;
        }
      });
      if (randomNumber(1, 5) === 1) {
        player.addItem(new Medkit({}), 1);
        toast(
          "+1 Medkit - You found an unused medkit attached to the enemy's corpse."
        );
      }

      let enemyWeaponNum = randomNumber(1, 5);
      let enemyWeapon =
        enemyWeaponNum === 5
          ? new BoltAction({quantity: 1})
          : enemyWeaponNum <= 4 && enemyWeaponNum >= 2
          ? new Pistol({quantity: 1})
          : null;
      setEnemy(
        new Character({
          meleeDamage: player.xp / 100,
          primaryWeapon: enemyWeapon,
        })
      );
    }
  };

  const medkit = player.inventory.filter(item => item.name === "Medkit")[0];

  return (
    <>
      <GlobalStyles />

      <div>
        <HUD player={player} />
        <main>
          {player.health === 0 ? (
            <h1>You died. refresh the page to restart</h1>
          ) : (
            <>
              <h1>WW2 Text Adventure Game</h1>
              <Button onClick={() => setShowInventory(!showInventory)}>
                Toggle inventory
              </Button>
              {showInventory && (
                <Inventory onClose={() => setShowInventory(false)} />
              )}
              <p>
                Enemy: {enemy.health} HP | Weapon:{" "}
                {enemy.primaryWeapon?.name || "Bare hands"}
              </p>
              <div>
                <Button onClick={() => handleBattle("primaryWeapon")}>
                  Attack with {player.primaryWeapon?.name || "bare hands"}
                </Button>
                {player?.secondaryWeapon && (
                  <Button onClick={() => handleBattle("secondaryWeapon")}>
                    Attack with {player.secondaryWeapon.name}
                  </Button>
                )}
                <Button
                  onClick={() => {
                    medkit.actions.use.run({player});
                    updatePlayer();
                  }}
                >
                  Use medkit
                </Button>
                <Button onClick={() => scavenge(player, updatePlayer)}>
                  scavenge
                </Button>
              </div>
            </>
          )}

          <p>&copy; 2023 stockriderj &lt;3</p>
        </main>
      </div>

      <Toaster position="bottom-right" reverseOrder={true} />
    </>
  );
}

export default App;
