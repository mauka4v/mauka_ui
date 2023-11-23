import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons'
import React, {useState} from 'react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    IconButton,
    Button
  } from '@chakra-ui/react'

function MenuBurger() {
    const [isLoggedIn, setIsLoggedIn] = useState(()=>false)

  return (
    <Menu >
        <MenuButton
        display={[ "flex", "flex", "none", "none",]}
        as={IconButton}
        aria-label='Options'
        icon={<HamburgerIcon />}
        variant='outline'
    />
    {
        isLoggedIn ?
        <MenuList>
        <MenuItem>About</MenuItem>
        <MenuItem>Contact Us</MenuItem>
        <MenuItem>Profile</MenuItem>
    </MenuList>
    :
    <MenuList>
        <MenuItem>Sign Up</MenuItem>
        <MenuItem>Login</MenuItem>
        <MenuItem>Contact Us</MenuItem>
    </MenuList>
    }
    
    </Menu>
  )
}

export default MenuBurger
