import { Button } from "@nextui-org/react";
import React from "react";

const CustomButton = ({
  color = "primary",
  variant = "ghost",
  onClick = () => {},
  isLoading = false,
  content = "Button",
}) => {
  return (
    <Button
      color={color}
      variant={variant}
      fullWidth={true}
      onClick={onClick}
      isLoading={isLoading}
    >
      {content}
    </Button>
  );
};

export default CustomButton;
