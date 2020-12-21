// From: https://gist.github.com/paulkaplan/5184275
export const miredToRGB = (mired) => {
  const kelvin = 10000 / mired
  let red, green, blue

  if (kelvin <= 66) {
    red = 255

    green = kelvin
    green = 99.4708025861 * Math.log(green) - 161.1195681661

    if (kelvin <= 19) {
      blue = 0
    } else {
      blue = kelvin - 10
      blue = 138.5177312231 * Math.log(blue) - 305.0447927307
    }
  } else {
    red = kelvin - 60
    red = 329.698727446 * Math.pow(red, -0.1332047592)

    green = kelvin - 60
    green = 288.1221695283 * Math.pow(green, -0.0755148492)

    blue = 255
  }
  return [
    clamp(red, 0, 255),
    clamp(green, 0, 255),
    clamp(blue, 0, 255),
  ]
}

export const clamp = (x, min, max) => {
  if (x < min) {
    return min
  }

  if(x > max) {
    return max
  }

  return x
}
