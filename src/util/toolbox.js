export function includes (target, value) {
  return Array.prototype.indexOf.call(target, value) !== -1
}

export function isObject (value) {
  return value !== null && typeof value === 'object'
}

export function isUndef (value) {
  return typeof value === 'undefined'
}

export function isString (value) {
  return typeof value === 'string'
}

export function isFunction (value) {
  return typeof value === 'function'
}

export function isArray (value) {
  return Object.prototype.toString.apply(value) === '[object Array]'
}

export function hasKey (target, key) {
  return Object.prototype.hasOwnProperty.call(target, key)
}

export function toArray (target, index = 0) {
  return Array.prototype.slice.call(target, index)
}

export function isPrivateAttr (key) {
  return (/^[_$]/).test(key)
}
