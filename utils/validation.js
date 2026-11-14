/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

function isString(value) {
  return typeof value === 'string';
}

function isNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

function isObject(value) {
  return value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value);
}

function isArray(value) {
  return Array.isArray(value);
}

function isEmpty(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (isObject(value)) return Object.keys(value).length === 0;
  return false;
}

module.exports = {
  isString,
  isNumber,
  isObject,
  isArray,
  isEmpty
};
