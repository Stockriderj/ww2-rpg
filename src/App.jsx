import React, {useEffect} from "react";
import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import toast from "react-hot-toast";

// Components
import HUD from "./game-ui/HUD";
import Actions from "./game-ui/Actions";
import {getIcon} from "./game-ui/Inventory";

// Game scripts
import {usePlayer} from "./context/PlayerContext";
import preloadSounds from "./game-scripts/preload-sounds";
import {ActionsProvider} from "./context/ActionsContext";
import Battle from "./game-ui/Battle";
import Button from "./game-ui/Button";
import Tooltip from "./game-ui/Tooltip";
import {randomNumber} from "./utils/helpers";
import battleRound from "./game-scripts/battle";

import {
  GiFirstAidKit,
  GiMachineGunMagazine,
  GiReloadGunBarrel,
  GiRun,
} from "react-icons/gi";

preloadSounds();

const Container = styled.main`
  margin-top: 9.5rem;
  padding-left: 50px;
  width: 100%;
  height: 80vh;
`;
const Icon = styled(Button)`
  position: relative;
  font-size: ${props => (props.size === "small" ? "2.4rem" : "3.6rem")};
  color: var(--light-theme);
  height: ${props => (props.size === "small" ? "4rem" : "5.2rem")};
  width: ${props => (props.size === "small" ? "4rem" : "5.2rem")};
  padding: 0.6rem;
  border-radius: 1rem;
  background-color: var(--medium-theme);
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.4);
`;

const BattleOptions = styled.div`
  position: fixed;
  bottom: 8.4rem;
  width: 100%;

  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 0.6rem;

  & div {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 0;
    width: fit-content;
  }
`;

const OptionsButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 0.2rem;
`;

const OptionText = styled.p`
  transform: rotate(-90deg);
  transform-origin: center;
  position: relative;
  left: -5rem;
  background-color: var(--medium-theme);
  width: fit-content;
  margin-right: -50%;
  align-self: center;
  /* max-width: 6.4rem; */
  padding: 0.4rem 0.8rem;
  /* text-align: center; */
  border-radius: 0.8rem;
`;

function App() {
  const {player, enemy, dispatch} = usePlayer();

  useEffect(() => {
    const tick = setInterval(() => dispatch({type: "tick"}), 1000);

    return () => clearInterval(tick);
  }, []);

  const medkit = player.inventory.filter(item => item.name === "Medkit")[0];

  // battle stuff
  const handleBattle = weapon => {
    const {updatedEnemy, playerWon} = battleRound(player, enemy, weapon);
    dispatch({type: "update"});

    dispatch({type: "setEnemy", payload: updatedEnemy});

    if (playerWon) {
      let battleRewards = [];
      let rewardNames = [];

      updatedEnemy.inventory.forEach(item => {
        if (item?.type === "Gun") {
          const newAmmo = Math.round(item.ammunition / randomNumber(2, 3));
          if (newAmmo === 0) return;
          battleRewards.push({
            type: "ammo",
            name: item.name,
            quantity: newAmmo,
          });
          rewardNames.push(`${newAmmo} ${item.name} Ammo`);
        }
      });

      battleRewards.forEach(item => {
        item?.type === "ammo"
          ? player.addAmmo(item.name, item.quantity)
          : player.addItem(item.name, item.quantity);
      });
      if (battleRewards.length)
        toast(
          `${rewardNames.map(reward => `[+${reward}] `)}- You loot the enemy.`
        );

      dispatch({type: "setEnemy", payload: null});
      // dispatch({type: "update"});
    }
  };

  return (
    <>
      <GlobalStyles />

      <div>
        <ActionsProvider>
          <Actions />
        </ActionsProvider>
        <Container>
          <HUD />

          {enemy && <Battle />}
          <BattleOptions>
            <div>
              <OptionText>{player.primaryWeapon?.name || "None"}</OptionText>
              <OptionsButtons>
                {player.primaryWeapon?.ammunition > -1 && (
                  <span>
                    <GiMachineGunMagazine /> {player.primaryWeapon.ammoLoad} /{" "}
                    {player.primaryWeapon.ammunition}
                  </span>
                )}
                <Icon
                  className="attack-primary"
                  onClick={() => handleBattle("primaryWeapon")}
                >
                  {getIcon(player?.primaryWeapon)}
                  <Tooltip parent="attack-primary">Attack with primary</Tooltip>
                </Icon>
                {player.primaryWeapon?.ammunition > -1 && (
                  <Icon
                    className="reload-primary"
                    onClick={player.primaryWeapon.actions.reload.run}
                    size="small"
                  >
                    <GiReloadGunBarrel />
                    <Tooltip parent="reload-primary">Reload</Tooltip>
                  </Icon>
                )}
              </OptionsButtons>
            </div>
            {player?.secondaryWeapon && (
              <div>
                <OptionText>{player.secondaryWeapon.name}</OptionText>
                <OptionsButtons>
                  {player.secondaryWeapon?.ammunition > -1 && (
                    <span>
                      <GiMachineGunMagazine /> {player.secondaryWeapon.ammoLoad}{" "}
                      / {player.secondaryWeapon.ammunition}
                    </span>
                  )}
                  <Icon
                    className="attack-secondary"
                    onClick={() => handleBattle("secondaryWeapon")}
                  >
                    {getIcon(player.secondaryWeapon)}
                    <Tooltip parent="attack-secondary">
                      Attack with secondary
                    </Tooltip>
                  </Icon>
                  {player.secondaryWeapon.ammunition > -1 && (
                    <Icon
                      className="reload-secondary"
                      onClick={player.secondaryWeapon.actions.reload.run}
                      size="small"
                    >
                      <GiReloadGunBarrel />
                      <Tooltip parent="reload-secondary">Reload</Tooltip>
                    </Icon>
                  )}
                </OptionsButtons>
              </div>
            )}
            {medkit && (
              <Icon
                className="battle-medkit"
                onClick={() => {
                  medkit.actions.use.run({player});
                  dispatch({type: "update"});
                }}
              >
                <GiFirstAidKit />
                <Tooltip parent="battle-medkit">Use medkit</Tooltip>
              </Icon>
            )}
            {enemy && (
              <Icon
                className="battle-escape"
                onClick={() => {
                  dispatch({type: "setEnemy", payload: null});
                  toast.success(
                    "You frantically run away from the enemy, stumbling over a rock and falling face-first into a trench. At least you're alive, right?"
                  );
                }}
              >
                <GiRun />
                <Tooltip parent="battle-escape">Escape</Tooltip>
              </Icon>
            )}
          </BattleOptions>

          <p style={{position: "absolute", bottom: 0}}>
            <span>&copy; 2023 stockriderj &lt;3</span>{" "}
            <a
              href="https://github.com/Stockriderj/ww2-rpg/wiki/Gameplay"
              target="_blank"
            >
              How to play
            </a>
          </p>
        </Container>
      </div>
    </>
  );
}

export default App;
