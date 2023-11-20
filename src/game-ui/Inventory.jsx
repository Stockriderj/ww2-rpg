import styled from "styled-components";
import {usePlayer} from "../context/PlayerContext";

import Button from "./Button";
import Draggable from "./Draggable";

const InventoryContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  overflow: scroll;

  z-index: 999;
  height: 40%;
  width: 40%;
  background: rgba(0, 0, 0, 0.9)
    url("https://plus.unsplash.com/premium_photo-1675695700239-44153e6bf430?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFwZXIlMjB0ZXh0dXJlfGVufDB8fDB8fHww");
  border-radius: 0 20px 0 0;
  margin-top: 6rem; /* To account for the fixed HUD */
  padding: 2rem;

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
  margin: 0 2.4rem;
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
`;

const Item = styled.li`
  background-color: #d3cbbf;
  color: #333;
  border: 1px solid #ddd;
  padding: 1rem 2.4rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Inventory({onClose}) {
  const {player, updatePlayer} = usePlayer();
  function handleEquip(item, itemType) {
    player.equip(item, itemType);
    updatePlayer();
  }

  return (
    <InventoryContainer handle=".inventory-header">
      <InventoryHeader className="inventory-header">
        <InventoryHeading>Inventory</InventoryHeading>
        <Close size="small" onClick={onClose}>
          X
        </Close>
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
            <div>
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
                    updatePlayer();
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
            </div>
          </Item>
        ))}
      </ItemList>
    </InventoryContainer>
  );
}
