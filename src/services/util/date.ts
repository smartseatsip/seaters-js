/**
 * Transforms this format "2017-07-27T17:18:33.994+0000" into "2017-07-27T17:19:38.182Z"
 * Leaves the latter format alone
 */
export function normalizeLondonTimezoneDate (date: string): string {

  return date.replace(/\+0000$/, 'Z');

}
