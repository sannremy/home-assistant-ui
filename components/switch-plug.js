import { Plug } from '@styled-icons/boxicons-regular'
import SwitchGeneric from './switch-generic'

class SwitchPlug extends SwitchGeneric {
  state = {
    enabled: false,
  }

  constructor(props) {
    super(props)

    this.type = 'plug'
    this.icon = <Plug />
  }
}

export default SwitchPlug
