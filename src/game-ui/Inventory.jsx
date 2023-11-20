import styled from "styled-components";
import {usePlayer} from "../context/PlayerContext";
import Button from "./Button";

const InventoryContainer = styled.div`
  margin-top: 6rem; /* To account for the fixed HUD */
  padding: 2rem;
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  background-color: #d3cbbf;
  color: #333;
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default function Inventory(enemy) {
  const {inventory, updateInventory, player, setPlayer} = usePlayer();
  function handleEquip(item, itemType) {
    player[itemType] !== item
      ? (player[itemType] = item)
      : (player[itemType] = null);
    setPlayer(player);
    updateInventory();
  }

  return (
    <InventoryContainer>
      <h2>Inventory</h2>
      <ItemList>
        {inventory.map(item => (
          <Item key={item.name}>
            {item.name} <small>x{item.quantity}</small>{" "}
            {item?.damage > 0 && (
              <>
                {item?.ammunition && <small>x{item.ammunition} Ammo</small>}
                <Button onClick={() => handleEquip(item, item.playerSlot)}>
                  {player[item.playerSlot] === item ? "Unequip" : "Equip"}
                </Button>
              </>
            )}
            {Object.values(item?.actions || []).map(action => (
              <Button
                onClick={() => {
                  let params = {};
                  (action?.accepts || []).map(dependency => {
                    switch (dependency) {
                      case "player":
                        params.player = player;
                      case "target":
                        params.target = enemy;
                    }
                  });
                  action.run(params);
                  updateInventory();
                  setPlayer(player);
                }}
                key={action.name}
              >
                {action.name}
              </Button>
            ))}
          </Item>
        ))}
      </ItemList>
    </InventoryContainer>
  );
}
