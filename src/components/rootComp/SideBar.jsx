import { Heading, List, ListItem } from '@chakra-ui/react'
import React from 'react'

function SideBar() {
  return (
    <div>
      <Heading>M A U K A</Heading>
      <List>
        <ListItem>
            Dashboard
        </ListItem>
        <ListItem>
            Profile
        </ListItem>
        <ListItem>
            Contact Us
        </ListItem>
      </List>
    </div>
  )
}

export default SideBar
