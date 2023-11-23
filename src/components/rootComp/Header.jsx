import React , {useState} from "react";
import { Heading, Box, ButtonGroup, Flex, Spacer, IconButton, useColorMode, useColorModeValue, Container, Button} from '@chakra-ui/react'
import { SunIcon , MoonIcon } from '@chakra-ui/icons'
import MenuBar from "./Menu";


function Header() {
    const {toggleColorMode} = useColorMode()
    const bgColor = useColorModeValue("gray.50", "whiteAlpha.50")
    const textColor = useColorModeValue("gray.600", "whiteAlpha.600")
    const [isDark, setIsDark] = useState(()=>true)
    const handleToggle = () => {
        toggleColorMode()
        setIsDark(!isDark)
    }
    return( 
        <Flex 
            minWidth='max-content' 
            alignItems='center'
            >
            <Spacer />
            <MenuBar/>
            <IconButton 
            variant="ghost" 
            size="sm" 
            onClick={handleToggle} 
            isRound={true} 
            icon={isDark ? <SunIcon/> : <MoonIcon/>}>
        
        </IconButton>
        </Flex>
    )
}

export default Header