import React, { useEffect, useState } from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

function RadioButtons(props) {
  const buttonConf = props.Params;
  const value = props.Value;
  const onChangeHandler = props.OnChange;
  // const [value, setValue] = useState(defaultValue)
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    setButtons(
      Object.keys(buttonConf).map((mapKey, idx) => (
        <Radio key={idx} value={buttonConf[mapKey]}>
          {mapKey}
        </Radio>
      ))
    );
  }, [buttonConf]);

  return (
    <RadioGroup onChange={(e) => onChangeHandler(e)} value={value}>
      <Stack direction="row">{buttons}</Stack>
    </RadioGroup>
  );
}

export default RadioButtons;
