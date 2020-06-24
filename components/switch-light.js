import { Bulb } from '@styled-icons/boxicons-regular'
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
}

export default SwitchLight
