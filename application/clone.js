// cloning including getters & setters
// https://stackoverflow.com/questions/34480936/cloning-a-javascript-object-including-getters-and-setters

export default function clone(src, target) {
  const props = {}
  Object.getOwnPropertyNames(src).forEach(prop => {
    props[prop] = Object.getOwnPropertyDescriptor(src, prop)
  })
  Object.defineProperties(target, props)
  return target
}
