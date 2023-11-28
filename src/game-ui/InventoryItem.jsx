import styled from "styled-components";
import {usePlayer} from "../context/PlayerContext";

import Button from "./Button";
import {getIcon} from "./Inventory";

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
`;

const ItemIcon = styled.div`
  font-size: 2.4rem;
  color: var(--light-theme);
  height: 3.6rem;
  width: 3.6rem;
  padding: 0.6rem;
  border-radius: 0.5rem;
  background-color: var(--medium-theme);
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const ItemText = styled.div`
  display: flex;
  flex-direction: column;

  & div {
    background-color: var(--medium-theme);
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

function InventoryItem({item}) {
  const {player, dispatch} = usePlayer();

  function handleEquip(item, itemType) {
    player.equip(item, itemType);
    dispatch({type: "update"});
  }

  return (
    <Item>
      <ItemInfo>
        <ItemIcon>{getIcon(item)}</ItemIcon>
        <ItemText>
          {item.name}
          <div>
            <small>x{item.quantity}</small>{" "}
            {item?.ammunition !== undefined && (
              <small>x{item.ammunition} Ammo</small>
            )}
          </div>
        </ItemText>
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
  );
}

export default InventoryItem;
