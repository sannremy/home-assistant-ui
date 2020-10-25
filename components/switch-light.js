import { Bulb } from '@styled-icons/boxicons-regular'
import { miredToRGB } from '../lib/color'
import SwitchGeneric from './switch-generic'

class SwitchLight extends SwitchGeneric {
  state = {
    enabled: false,
  }

  constructor(props) {
    super(props)

    this.type = 'light'
    this.icon = <Bulb />
  }

  displayExtraInfo() {
    // entityId: action.id,
    // state: action.state,
    // name,
    // minMireds: action.attributes.min_mireds,
    // maxMireds: action.attributes.max_mireds,
    // effectList: action.attributes.effect_list,
    // brightness: action.attributes.brightness,
    // colorTemperature: action.attributes.color_temp,
    // effect: action.attributes.effect,
    let brightness = ''
    if (isNaN(this.props.brightness)) {
      brightness = 'off'
    } else {
      brightness = `${Math.round(this.props.brightness / 255 * 100)} %`
    }

    let [
      red,
      blue,
      green,
      alpha,
    ] = [0, 0, 0, 0.1]

    if (this.props.rgbColor) {
      [
        red,
        blue,
        green
      ] = this.props.rgbColor
      alpha = 1
    } else if (this.props.colorTemperature) {
      [red, blue, green] = miredToRGB(this.props.colorTemperature)
      alpha = 1
    }

    return (
      <div className="flex items-center">
        <div className="border border-white w-4 h-4 rounded-full" style={{
          backgroundColor: `rgba(${red}, ${blue}, ${green}, ${alpha})`
        }} />
        <div className="ml-2">{brightness}</div>
      </div>
    )
  }
}

export default SwitchLight
