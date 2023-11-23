import { Button, ButtonProps } from "@chakra-ui/react";


 const DateButton = (props) => {
  return (
    <Button
      variant="ghost"
      color="gray.500"
      justifyContent="flex-start"
      width="100%"
      minWidth="40"
      {...props}
    />
  );
};

export default DateButton