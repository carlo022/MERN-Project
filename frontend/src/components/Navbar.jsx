import { Button, Container, Flex, HStack, Text, Icon } from "@chakra-ui/react";
import { useColorMode } from "../components/ui/color-mode";
import { Link, useLocation  } from "react-router-dom";
// Changed LuPlusSquare to LuSquarePlus
import { LuSquarePlus, LuSun } from "react-icons/lu"; 
import { IoMoon } from "react-icons/io5";
import { MdArrowBack, MdStore } from "react-icons/md";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();

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
        {location.pathname === "/CreateProduct" ?
        (<Link to="/Homepage" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Icon as={MdArrowBack} boxSize={8} color="purple.500"/>
        <Text
          fontSize={{ base: "2xl", sm: "3xl" }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          // In v3, we can use the 'color' prop with a gradient shorthand
          bgGradient="to-r"
          gradientFrom="purple.600"
          gradientTo="pink.400"
          bgClip="text"
          display="flex" 
          alignItems="center" 
          justifyContent="center"
          gap={2}>
            View Products
          </Text>
          </Link>)
        :(<Link to="/Homepage" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Text
          fontSize={{ base: "2xl", sm: "3xl" }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          // In v3, we can use the 'color' prop with a gradient shorthand
          bgGradient="to-r"
          gradientFrom="purple.600"
          gradientTo="pink.400"
          bgClip="text"
          display="flex" 
          alignItems="center" 
          justifyContent="center"
          gap={2}>
            Product Store
          </Text>
          <Icon as={MdStore} boxSize={8} color="pink.400"/>
          </Link>)
          }

        {/* In v3, use 'gap' instead of 'spacing' */}
        <HStack gap={2} alignItems={"center"}>
          <Link to={"/CreateProduct"}>
            <Button 
              variant="solid"
              bg="purple.500"
              color="white"
              _hover={{ bg: "purple.700" }}
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