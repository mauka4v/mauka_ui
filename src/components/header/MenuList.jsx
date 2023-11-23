import React, { useState } from "react";
import { Heading, ButtonGroup, Flex, Spacer, IconButton, useColorMode, useColorModeValue, Container, Button} from '@chakra-ui/react'
import { SunIcon  } from '@chakra-ui/icons'

function MenuListLinks() {
    const [isLoggedIn, setIsLoggedIn] = useState(()=>false)
    return( 
        <ButtonGroup display={["none", "none", "flex", "flex"]} >
            <Button variant='ghost'>Sign Up</Button>
            {!isLoggedIn ? 
                <Button variant='ghost'>Log in</Button>
                : <Button variant='ghost'>Profile</Button>
            }
         </ButtonGroup>
    )
}

export default MenuListLinks