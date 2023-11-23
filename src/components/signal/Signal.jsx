import React, { useState } from "react";
import { Button, Text } from "@chakra-ui/react";
import { TREND_CONF, intervalAgeMapping } from "../../common";
import { relativeTime } from "../../common/moment";

function Signal(props) {
  const { RowJSON, Column, Type } = props;
  const [color, setColor] = useState("");
  const [value, setValue] = useState("");
  const [age, setAge] = useState("");

  React.useEffect(() => {
    const colValue = RowJSON[Column];
    const updateDateCol = intervalAgeMapping[Column];
    setAge(relativeTime(RowJSON[updateDateCol]));
    const dataConf = TREND_CONF[colValue];
    if (dataConf !== undefined && Object.keys(dataConf).length > 0) {
      setColor(dataConf.color);
      setValue(colValue);
    } else {
      setValue(colValue);
    }
  }, [RowJSON]);
  return (
    <div>
      {color ? <Text color={color}>{value}</Text> : <Text> {value}</Text>}
      {Object.keys(intervalAgeMapping).includes(Column) && (
        <Text as="sub">{age}</Text>
      )}
    </div>
  );
}

export default Signal;
