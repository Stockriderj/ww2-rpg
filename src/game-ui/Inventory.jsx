import styled from "styled-components";
import {usePlayer} from "../context/PlayerContext";

const InventoryContainer = styled.div`
  margin-top: 6rem; /* To account for the fixed HUD */
  padding: 2rem;
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default function Inventory() {
  const {items, setItems, player, setPlayer} = usePlayer();

  return (
    <InventoryContainer>
      <h2>Inventory</h2>
      <ItemList>
        {items.map(item => (
          <Item key={item.name}>
            {item.name} <small>x{item.quantity}</small>{" "}
            {item.type === "Gun" && (
              <>
                <small>x{item.ammunition} Ammo</small>
                <button
                  onClick={() => {
                    player.weapon = item;
                    setPlayer(player);
                  }}
                >
                  equip
                </button>
                <button
                  onClick={() => {
                    item.shoot();
                    setItems([...items]);
                  }}
                >
                  shoot
                </button>
              </>
            )}
          </Item>
        ))}
      </ItemList>
    </InventoryContainer>
  );
}
