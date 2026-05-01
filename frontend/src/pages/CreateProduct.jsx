import { Box, Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useState } from "react";
import { useProductStore } from "../store/product.jsx";

export const CreateProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    Image: "",
    description: "",
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    
    // Simplified toast - react-toastify handles defaults well
    if (!success) {
      toast.error(message);
    } else {
      toast.success(message);
      // Only clear form on success
      setNewProduct({ name: "", price: "", Image: "", description: "" });
    }
  };

  return (
    <Container maxW="400px">
      {/* v3 uses 'gap' instead of 'spacing' */}
      <VStack gap={8} mt={8}>
        <Heading as="h1" size="2xl" textAlign="center">
          Create New Product
        </Heading>

        <Box 
          w="full" 
          bg={{ base: "white", _dark: "gray.800" }} // Replaces useColorModeValue
          p={6} 
          rounded="lg" 
          shadow="md"
        >
          <VStack gap={4}>
            <Input _dark={{ bg: "gray.700", color: "gray.200" }}
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input _dark={{ bg: "gray.700", color: "gray.200" }}
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input _dark={{ bg: "gray.700", color: "gray.200" }}
              placeholder="Image URL"
              name="Image"
              value={newProduct.Image}
              onChange={(e) => setNewProduct({ ...newProduct, Image: e.target.value })}
            />
            <Input _dark={{ bg: "gray.700", color: "gray.200" }}
              placeholder="Description"
              name="description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />  

            <Button 
              colorPalette="blue" // v3 uses colorPalette
              variant="solid"
              onClick={handleAddProduct} 
              w="full"
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreateProduct;