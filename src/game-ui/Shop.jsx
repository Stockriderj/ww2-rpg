import styled from "styled-components";
import toast from "react-hot-toast";
import {usePlayer} from "../context/PlayerContext";

import {GiGoldBar} from "react-icons/gi";
import Button from "./Button";
import Item from "./Item";
import SidePanel from "./SidePanel";

import {
  BoltActionAmmobox,
  Grenade,
  Medkit,
  PistolAmmobox,
} from "../game-scripts/items/inventoryItems";

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PlayerSlot = styled.div`
  position: relative;
  cursor: help;
  font-size: 6.4rem;
  color: var(--light-theme);
  height: 8.6rem;
  width: 8.6rem;
  padding: 1.2rem;
  border-radius: 1rem;
  background-color: var(--medium-theme);
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.4);
`;

export default function Shop() {
  const {player, dispatch} = usePlayer();
  const shopItems = [
    {item: new Medkit({quantity: 1}), price: 20},
    {item: new Grenade({quantity: 1}), price: 20},
    {item: new BoltActionAmmobox({quantity: 5}), price: 10},
    {item: new PistolAmmobox({quantity: 7}), price: 10},
  ];

  function handleBuy(item) {
    if (player.gold < item.price) return toast.error("You can't afford that.");
    player.gold -= item.price;
    player.addItem(item.item.name, item.item.quantity);
    dispatch({type: "update"});
    toast(`You bought a ${item.item.name} for ${item.price} gold.`);
  }

  return (
    <SidePanel name="shop">
      <ItemList>
        {shopItems.map(item => (
          <Item item={item.item} key={item.item.name}>
            <Button size="small" onClick={() => handleBuy(item)}>
              Buy (<GiGoldBar />
              {item.price})
            </Button>
          </Item>
        ))}
      </ItemList>
    </SidePanel>
  );
}
