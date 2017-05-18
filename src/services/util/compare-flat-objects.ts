function createFlatArray (o, array) {
  Object.keys(o).map(key => {

    let value = o[key];
    if (value === undefined || value === null) {
      return;
    } else if (value instanceof Function) {
      throw new Error('Functions are not supported');
    } else if (value instanceof Array) {
      throw new Error('Arrays are not supported');
    } else if (typeof value === 'object') {
      return createFlatArray(value, array);
    }
    array.push(key + value);
    return;
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
