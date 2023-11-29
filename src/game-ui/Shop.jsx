import styled from "styled-components";
import {usePlayer} from "../context/PlayerContext";
import {useActions} from "../context/ActionsContext";

import {
  GiCarpetBombing,
  GiFirstAidKit,
  GiGoldBar,
  GiGrenade,
  GiLeeEnfield,
  GiStickFrame,
  GiWaltherPpk,
} from "react-icons/gi";
import Button from "./Button";
import Tooltip from "./Tooltip";
import {
  BoltActionAmmobox,
  Grenade,
  Medkit,
  PistolAmmobox,
} from "../game-scripts/items/inventoryItems";
import Item from "./Item";
import toast from "react-hot-toast";

const Close = styled(Button)`
  position: absolute;
  margin: 0;
  font-size: 1.2rem;
  background: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ShopContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  overflow: scroll;
  height: 100vh;
  width: fit-content;
  background: rgba(0, 0, 0, 0.9)
    url("https://plus.unsplash.com/premium_photo-1675695700239-44153e6bf430?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFwZXIlMjB0ZXh0dXJlfGVufDB8fDB8fHww");
  background-size: cover;
  box-shadow: -10px 0 5px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  z-index: 999;

  transform: ${props =>
    props.isvisible === "true" ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.5s ease-in-out; // Smooth transition for sliding in and out
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ShopHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ShopHeading = styled.h2`
  color: #333;
  text-align: center;
  font-size: 3.6rem;
  text-align: center;
  flex-grow: 1;
  margin: 0;
  text-transform: uppercase;
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
  const {isVisible, setIsVisible} = useActions();

  function handleBuy(item) {
    if (player.gold < item.price) return toast.error("You can't afford that.");
    player.gold -= item.price;
    player.addItem(item.item.name, item.item.quantity);
    dispatch({type: "update"});
    toast(`You bought a ${item.item.name} for ${item.price} gold.`);
  }

  return (
    <ShopContainer isvisible={(isVisible === "shop").toString()}>
      <ShopHeader>
        <Close size="small" onClick={() => setIsVisible("")}>
          X
        </Close>
        <ShopHeading>Shop</ShopHeading>
      </ShopHeader>
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
    </ShopContainer>
  );
}
