import { SearchIcon } from '@chakra-ui/icons'
import { Button, IconButton } from '@chakra-ui/react'
import React, { Component } from 'react'

export class ResearchButton extends Component {
  render() {
    return (
        <Button><IconButton isRound={true} icon={<SearchIcon/>}></IconButton></Button>
    )
  }
}

export default ResearchButton
