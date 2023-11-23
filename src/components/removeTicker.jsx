import React, { Component } from 'react'
import { Button, IconButton  } from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import {iconButtonTheme} from "../theme/iconTheme"

export class RemoveTickerBtn extends Component {
  render() {
    return (
        <Button>
          <IconButton 
            variant={iconButtonTheme}
            isRound={true} 
            icon={<SmallCloseIcon/>}>
          </IconButton>
        </Button>
    )
  }
}

export default RemoveTickerBtn
