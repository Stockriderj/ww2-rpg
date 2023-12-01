import styled from "styled-components";
import {usePlayer} from "../context/PlayerContext";

import {
  GiAmmoBox,
  GiCarpetBombing,
  GiFirstAidKit,
  GiGrenade,
  GiLeeEnfield,
  GiStickFrame,
  GiWaltherPpk,
} from "react-icons/gi";
import Button from "./Button";
import Item from "./Item";
import SidePanel from "./SidePanel";

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
`;

const iconMapping = {
  Gun: {
    "Bolt Action": GiLeeEnfield,
    Pistol: GiWaltherPpk,
  },
  Order: {
    Bombing: GiCarpetBombing,
  },
  Medkit: GiFirstAidKit,
  Grenade: GiGrenade,
  Ammobox: GiAmmoBox,
};

export function getIcon(item) {
  const IconComponent = item?.subType
    ? iconMapping[item.type]?.[item.subType]
    : iconMapping[item?.type];
  return IconComponent ? <IconComponent /> : <GiStickFrame />;
}

export default function Inventory() {
  const {player, dispatch} = usePlayer();

  function handleEquip(item, itemType) {
    player.equip(item, itemType);
    dispatch({type: "update"});
  }

  return (
    <SidePanel name="inventory">
      <ItemList>
        {player.inventory.map(item => (
          <Item item={item} key={item.name}>
            <>
              {Object.values(item?.actions || []).map(
                action =>
                  action?.inventoryIgnore !== true && (
                    <Button
                      size="small"
                      onClick={() => {
                        let params = {};
                        (action?.accepts || []).map(dependency => {
                          switch (dependency) {
                            case "player":
                              params.player = player;
                            case "dispatch":
                              params.dispatch = dispatch;
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
                  )
              )}
              {item?.damage > 0 && (
                <Button
                  size="small"
                  playSound={false}
                  onClick={() => handleEquip(item, item.playerSlot)}
                >
                  {player[item.playerSlot] === item ? "Unequip" : "Equip"}
                </Button>
              )}
            </>
          </Item>
        ))}
      </ItemList>
    </SidePanel>
  );
}
