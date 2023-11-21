import toast from "react-hot-toast";
import {randomNumber, stackItems} from "../utils/helpers";

const scavengeDrops = [
  {
    chance: 20,
    items: ["Medkit", "Grenade"],
  },
];

export default function scavenge(player, dispatch) {
  let droppedItems = [];
  for (let i = 0; i < randomNumber(2, 5); i++) {
    scavengeDrops.forEach(drop => {
      if (randomNumber(0, 100) <= drop.chance) {
        droppedItems.push(drop.items[randomNumber(0, drop.items.length - 1)]);
      }
    });
  }
  const {stackedItems, stackedText} = stackItems(droppedItems);

  stackedItems.forEach(item => player.addItem(item.name, item.quantity));
  player.addXp(droppedItems.length * 10);
  dispatch({type: "update"});

  stackedItems.length
    ? toast.success(`You found ${stackedText}!`)
    : toast.error("You didn't find anything.");
}
