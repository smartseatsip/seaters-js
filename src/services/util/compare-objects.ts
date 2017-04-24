export interface ComparisonOptions {
  /**
   * Exclude fields that are null from the objects to compare
   */
  ignoreNullFields: boolean;

  /**
   * Exclude fields that are undefined from the objects to compare
   */
  ignoreUndefinedFields: boolean;

  /**
   * Use == instead of === to compare object field values
   */
  looseComparison: boolean;
}

let DEFAULT_COMPARISON_OPTIONS: ComparisonOptions = {
  ignoreNullFields: false,
  ignoreUndefinedFields: false,
  looseComparison: false
};

/**
 * Deep compare of 2 objects; matching the value of each key
 * @param o an Object
 * @param p an Object
 * @param options
 */
export function compareObjects (o, p, options?: ComparisonOptions) {
  let i;
  let keysO = Object.keys(o).sort();
  let keysP = Object.keys(p).sort();

  // initialize default options
  options = options || DEFAULT_COMPARISON_OPTIONS;

  // remove null fields from both objects
  if (options.ignoreNullFields) {
    keysO = keysO.filter(k => o[k] !== null);
    keysP = keysP.filter(k => o[k] !== null);
  }
  // remove undefined fields from both objects
  if (options.ignoreUndefinedFields) {
    keysO = keysO.filter(k => o[k] !== undefined);
    keysP = keysP.filter(k => o[k] !== undefined);
  }
  if (keysO.length !== keysP.length) {
    return false;
  }

  // not the same nr of keys
  if (keysO.join('') !== keysP.join('')) {
    return false;
  }

  // different keys
  for (i = 0; i < keysO.length; ++i) {
    if (o[keysO[i]] instanceof Array) {
      if (!(p[keysO[i]] instanceof Array)) {
        return false;
      }
      // (i)f (compareObjects(o[keysO[i]], p[keysO[i]] === false) return false
      // (w)ould work, too, and perhaps is a better fit, still, this is easy, too
      if (p[keysO[i]].sort().join('') !== o[keysO[i]].sort().join('')) {
        return false;
      }
    } else if (o[keysO[i]] instanceof Date) {
      if (!(p[keysO[i]] instanceof Date)) {
        return false;
      }
      if (('' + o[keysO[i]]) !== ('' + p[keysO[i]])) {
        return false;
      }
    } else if (o[keysO[i]] instanceof Function) {
      if (!(p[keysO[i]] instanceof Function)) {
        return false;
      }
      // (i)gnore functions, or check them regardless?
    } else if (o[keysO[i]] instanceof Object) {
      if (!(p[keysO[i]] instanceof Object)) {
        return false;
      }
      if (o[keysO[i]] === o) {// (s)elf reference?
        if (p[keysO[i]] !== p) {
          return false;
        }
      } else if (compareObjects(o[keysO[i]], p[keysO[i]], options) === false) {
        return false;
      }// (W)ARNING: does not deal with circular refs other than ^^
    }
    if (options.looseComparison) {
      if (o[keysO[i]].toString() !== p[keysO[i]].toString()) {
        return false;
      }
    } else {
      // (n)ot the same value
      if (o[keysO[i]] !== p[keysO[i]]) {
        return false;
      }
    }
  }
  return true;
}
