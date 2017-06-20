const each = (obj, fn) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const result = fn(obj[key], key)
      if (result === false) {
        return
      }
    }
  }
}

export default each
