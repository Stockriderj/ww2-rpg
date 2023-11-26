import styled from "styled-components";
import {usePlayer} from "../context/PlayerContext";

import Button from "./Button";
import {useState} from "react";
import {useActions} from "../context/ActionsContext";

const InventoryContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  overflow: scroll;
  height: 100vh;
  width: fit-content;
  background: rgba(0, 0, 0, 0.9)
    url("https://plus.unsplash.com/premium_photo-1675695700239-44153e6bf430?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFwZXIlMjB0ZXh0dXJlfGVufDB8fDB8fHww");
  background-size: cover;
  padding: 2rem;

  animation: ${props =>
      props.isvisible === "true" ? "slideInLeft" : "slideOutLeft"}
    0.5s ease-out;
  opacity: ${props => (props.isvisible === "true" ? 1 : 0)};
  z-index: ${props => (props.isvisible === "true" ? 999 : -999)};
  transition: opacity 0.5s ease;

  @media (max-width: 600px) {
    width: 20rem;
  }
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
`;

const InventoryHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InventoryHeading = styled.h2`
  color: #333;
  text-align: center;
  font-size: 2.4rem;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 20px;

  @media (max-width: 600px) {
    margin: 0;
    letter-spacing: 0;
  }
`;

const Close = styled(Button)`
  margin: 0;
  font-size: 1.2rem;
  background: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Item = styled.li`
  background-color: var(--light-theme);
  color: #333;
  border: 1px solid #ddd;
  padding: 1rem 2.4rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1.8rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3.6rem;

  @media (max-width: 600px) {
    font-size: 1.2rem;

    & small {
      font-size: 0.6rem;
    }
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;

  & div {
    background-color: #8b806d;
    width: fit-content;
    color: var(--light-theme);
  }
`;

const ItemActions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.6rem;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export default function Inventory() {
  const {player, dispatch} = usePlayer();
  const {isVisible, setIsVisible} = useActions();

  function handleEquip(item, itemType) {
    player.equip(item, itemType);
    dispatch({type: "update"});
  }

  return (
    <>
      <InventoryContainer isvisible={isVisible.toString()}>
        <InventoryHeader>
          <Close size="small" onClick={() => setIsVisible(false)}>
            X
          </Close>
          <InventoryHeading>Inventory</InventoryHeading>
        </InventoryHeader>
        <ItemList>
          {player.inventory.map(item => (
            <Item key={item.name}>
              <ItemInfo>
                {item.name}
                <div>
                  {" "}
                  <small>x{item.quantity}</small>{" "}
                  {item?.ammunition !== undefined && (
                    <small>x{item.ammunition} Ammo</small>
                  )}
                </div>
              </ItemInfo>
              <ItemActions>
                {Object.values(item?.actions || []).map(action => (
                  <Button
                    size="small"
                    onClick={() => {
                      let params = {};
                      (action?.accepts || []).map(dependency => {
                        switch (dependency) {
                          case "player":
                            params.player = player;
                          case "target":
                          //   params.target = enemy;
                        }
                      });
                      action.run(params);
                      dispatch({type: "update"});
                    }}
                    key={action.name}
                  >
                    {action.name}
                  </Button>
                ))}
                {item?.damage > 0 && (
                  <Button
                    size="small"
                    playSound={false}
                    onClick={() => handleEquip(item, item.playerSlot)}
                  >
                    {player[item.playerSlot] === item ? "Unequip" : "Equip"}
                  </Button>
                )}
              </ItemActions>
            </Item>
          ))}
        </ItemList>
      </InventoryContainer>
    </>
  );
}
