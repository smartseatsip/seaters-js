function createFlatArray (o, array) {
  Object.keys(o).map(key => {

    let value = o[key];
    if (value === undefined || value === null) {
      return;
    } else if (typeof value === 'string') {
      array.push(key.toString() + value.toString());
      return;
    }
    return createFlatArray(value, array);
  });
  return array;
}

/**
 * This function stringifies and sorts all key-values in the array and compares them
 * without any null or undefined values
 *
 * @param o {object}
 * @param p {object}
 * @returns {boolean} whether or not the objects o and p are equal
 */
export function compareFlatObjects (o: any, p: any) {
  let oArray = createFlatArray(o, []);
  let pArray = createFlatArray(p, []);
  oArray.sort();
  pArray.sort();
  return oArray.join('') === pArray.join('');
}
