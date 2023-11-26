export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function checkProbability(threshold) {
  return randomNumber(0, 100) <= threshold ? true : false;
}

/**
 * @param {array} items array of strings
 *
 * @returns {Object} {stackedItems: {name, quantity}, stackedText: "x2 Lorem, x1 Ipsum"}
 */
export function stackItems(items, getQuantity = true) {
  let itemPairs = getQuantity
    ? Object.entries(
        items.reduce((acc, item) => {
          acc[item] = (acc[item] || 0) + 1;
          return acc;
        }, {})
      )
    : items;

  let stackedText = "";
  const stackedItems = itemPairs.map(([name, quantity], i) => {
    let quantityX = getQuantity ? `${quantity}x ` : "";
    let separator = i === 0 ? "" : i === itemPairs.length - 1 ? " and " : ", ";

    stackedText += `${separator}${quantityX}${name}`;

    return {name, quantity};
  });

  return {stackedItems, stackedText};
}
