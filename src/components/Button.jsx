import { Box, Button, Image } from "@chakra-ui/react";
import { FiArrowUpRight } from "react-icons/fi";

export const ButtonComponent = ({ buttonText }) => {
  return (
    <Button
      rounded={"full"}
      bg={"#0b0b0f"}
      color={"white"}
      _hover={{
        bg: "white",
        color: "black",
        transition: "background-color 0.3s easeInOut, color 0.3s easeInOut",
        "& .box-icon": {
          bg: "black",
          color: "white",
          transition: "background-color 0.7s easeInOut, color 0.7s easeInOut",
        },
      }}
      className="border-2 border-white rounded-full p-2 text-sm "
    >
      <span className="mx-2">{buttonText}</span>
      <Box
        as="span"
        display="flex"
        alignItems="center"
        justifycontent="center"
        bg="white"
        color="black"
        width="28px"
        height="28px"
        ml={2}
        className="box-icon rounded-full"
      >
        <FiArrowUpRight />
      </Box>
    </Button>
  );
};
