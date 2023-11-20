import toast from "react-hot-toast";
import {randomNumber} from "../utils/helpers";
import {Medkit, Grenade} from "./items/inventoryItems";

const drops = [
  {
    chance: 100,
    items: ["Medkit", "Grenade"],
  },
  //   {item: new Medkit(), chance: 20},
  //   {item: new Grenade(), chance: 20},
];

export default function scavenge(player, updatePlayer) {
  let droppedItems = [];
  for (let i = 0; i < randomNumber(2, 5); i++) {
    drops.forEach(drop => {
      if (randomNumber(0, 100) <= drop.chance) {
        droppedItems.push(drop.items[randomNumber(0, drop.items.length - 1)]);
      }
    });
  }
  const {stackedItems, stackedText} = stackItems(droppedItems);

  stackedItems.forEach(item => player.addItem(item.name, item.quantity));
  updatePlayer();
  toast.success(`You found ${stackedText}!`);
}

/**
 * @param {array} items array of strings
 *
 * @returns idk lol
 */
function stackItems(items) {
  const itemCount = {};
  items.forEach(item =>
    itemCount[item] ? itemCount[item]++ : (itemCount[item] = 1)
  );

  const stackedItems = [];
  const stackedArr = Object.entries(itemCount);
  const stackedText = stackedArr
    .map(([name, quantity], i) => {
      stackedItems.push({name, quantity});
      return i === 0
        ? `${quantity}x ${name}`
        : i === stackedArr.length - 1
        ? ` and ${quantity}x ${name}`
        : ` ${quantity}x ${name}`;
    })
    .toString();

  return {stackedItems, stackedText};
}
