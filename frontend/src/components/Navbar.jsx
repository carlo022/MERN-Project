import { Button, Container, Flex, HStack, Text, Icon } from "@chakra-ui/react";
import { useColorMode } from "../components/ui/color-mode";
import { Link } from "react-router-dom";
// Changed LuPlusSquare to LuSquarePlus
import { LuSquarePlus, LuSun } from "react-icons/lu"; 
import { IoMoon } from "react-icons/io5";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container 
      maxW={"1140px"} 
      px={4} 
      bg={colorMode === "light" ? "gray.100" : "gray.900"} 
      py={4} 
      mt={4} 
      borderRadius="md"
    >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "2xl", sm: "3xl" }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          // In v3, we can use the 'color' prop with a gradient shorthand
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip="text"
        >
          <Link to="/Homepage">Product Store 🛍️</Link>
        </Text>

        {/* In v3, use 'gap' instead of 'spacing' */}
        <HStack gap={2} alignItems={"center"}>
          <Link to={"/CreateProduct"}>
            <Button 
              variant="solid"
              bg="blue.500"
              color="white"
              _hover={{ bg: "blue.600" }}
            >
              <Icon asChild fontSize="2xl">
                <LuSquarePlus />
              </Icon>
            </Button>
          </Link>
          
          <Button 
            variant="solid"
            bg={colorMode === "light" ? "gray.200" : "gray.700"}
            color={colorMode === "light" ? "gray.800" : "gray.200"}
            _hover={{ bg: colorMode === "light" ? "gray.300" : "gray.600" }}
            onClick={toggleColorMode}
          >
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;