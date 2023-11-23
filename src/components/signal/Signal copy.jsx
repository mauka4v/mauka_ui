import React, {useState} from "react";
import { Button } from '@chakra-ui/react'
import {SIGNAL_CONF} from "../../common"

function Signal(props) {
    const {Columns, DataRows, Type} = props
    const [color, setColor] = useState("")
    const [trend, setTrend] = useState("")
    React.useEffect(()=>{
        const colLoc = Columns.indexOf(Type)
        if (colLoc > 0){
            const signal = DataRows[colLoc]
            const dataConf = SIGNAL_CONF[signal]
            setColor(dataConf.color)
            setTrend(dataConf.trend)
        }
    })
    return(<div>
        {color && <Button 
            colorScheme={color}>{trend}
         </Button>}
          </div>)
}

export default Signal