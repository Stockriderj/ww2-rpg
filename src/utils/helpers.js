export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @param {array} items array of strings
 *
 * @returns {Object} {stackedItems: {name, quantity}, stackedText: "x2 Lorem, x1 Ipsum"}
 */
export function stackItems(items) {
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
