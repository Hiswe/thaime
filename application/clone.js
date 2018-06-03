// cloning including getters & setters
// https://stackoverflow.com/questions/34480936/cloning-a-javascript-object-including-getters-and-setters

export function shallowClone(obj) {
  const clone = Object.create(Object.getPrototypeOf(obj))
  const descriptors = Object.getOwnPropertyDescriptors(obj)
  Object.defineProperties(clone, descriptors)
  return clone
}
