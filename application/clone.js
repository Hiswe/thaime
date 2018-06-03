// cloning including getters & setters
// https://stackoverflow.com/questions/34480936/cloning-a-javascript-object-including-getters-and-setters

export function shallowClone(obj) {
  var clone = Object.create(Object.getPrototypeOf(obj))
  var descriptors = Object.getOwnPropertyDescriptors(obj)
  Object.defineProperties(clone, descriptors)
  return clone
}

export default function clone(src, target) {
  const props = {}
  Object.getOwnPropertyNames(src).forEach(prop => {
    props[prop] = Object.getOwnPropertyDescriptor(src, prop)
  })
  Object.defineProperties(target, props)
  return target
}
