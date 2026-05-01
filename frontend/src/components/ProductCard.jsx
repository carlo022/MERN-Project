import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogActionTrigger,
  DialogCloseTrigger,
  DialogTitle,
  DialogBackdrop,
  Portal, // Added Portal for better layering
  Flex,
} from "@chakra-ui/react";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { useProductStore } from "../store/product";


const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { deleteProduct, updateProduct } = useProductStore();

  // Delete handler
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    setDeleteDialogOpen(false);
    if (!success) {
      toast.error(message);
    } else {
      toast.success(message);
    }
  };

  // Update handler
  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    console.log("After update, success:", success);
    setOpen(false);
    if (!success) {
      toast.error(message);
    } else {
      toast.success(message);
    }
  };

  return (
    <>
    <Flex direction="column" px={4} py={2} w="full">
      <Box
        p={10}
        py={4}
        shadow="lg"
        rounded="lg"
        overflow="hidden" // This was trapping your Dialog!
        transition="all 0.3s"
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        bg={{ base: "white", _dark: "gray.800" }}
        px={4}
        
      >
          <Image
            src={product.Image}
            alt={product.name}
            h={48}
            w="full"
            objectFit="cover"
        />

        <Box p={4} bg={{ base: "white", _dark: "gray.800" }}>
          <Heading as="h3" size="md" mb={2}>
            {product.name}
          </Heading>

          <Text mb={4} color={{ base: "gray.600", _dark: "gray.200" }}>
            {product.description}
          </Text>

          <Text
            fontWeight="bold"
            fontSize="xl"
            mb={4}
            color={{ base: "gray.600", _dark: "gray.200" }}
          >
            ${product.price}
          </Text>

          <HStack gap={3}>
            <Button size="sm" colorPalette="blue" onClick={() => setOpen(true)}>
              <LuPencil />
            </Button>

            <Button
              size="sm"
              colorPalette="red"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <LuTrash2 />
            </Button>
          </HStack>
        </Box>
      </Box>
      </Flex>

      {/* Update Product Dialog */}
      <DialogRoot
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <Portal>
          <DialogBackdrop />
          <DialogContent
            bg={{ base: "white", _dark: "gray.800" }}
            borderRadius="md"
            boxShadow="2xl"
            p={6}
            maxWidth="sm"
            minW="320px"
            position="fixed"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
            <DialogHeader>
              <DialogTitle fontSize="xl" fontWeight="bold">
                Update Product
              </DialogTitle>
            </DialogHeader>
            <DialogCloseTrigger />
            <DialogBody>
              <VStack gap={4} py={4}>
                <Input
                  placeholder="Product Name"
                  value={updatedProduct.name}
                  variant="outline"
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      name: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Price"
                  type="number"
                  value={updatedProduct.price}
                  variant="outline"
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      price: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Image URL"
                  value={updatedProduct.Image}
                  variant="outline"
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      Image: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Description"
                  value={updatedProduct.description}
                  variant="outline"
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      description: e.target.value,
                    })
                  }
                />
              </VStack>
            </DialogBody>
            <DialogFooter gap={3}>
              <DialogActionTrigger asChild>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </DialogActionTrigger>
              <Button
                colorPalette="blue"
                onClick={() => handleUpdateProduct(product._id, updatedProduct)}
              >
                Update Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Portal>
      </DialogRoot>

      {/* Delete Confirmation Dialog */}
      <DialogRoot
        open={deleteDialogOpen}
        onOpenChange={(e) => setDeleteDialogOpen(e.open)}
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <Portal>
          <DialogBackdrop />
          <DialogContent
            bg={{ base: "white", _dark: "gray.800" }}
            borderRadius="md"
            boxShadow="2xl"
            p={6}
            maxWidth="sm"
            minW="320px"
            position="fixed"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
            <DialogHeader>
              <DialogTitle fontSize="xl" fontWeight="bold">
                Are you sure to delete this product?
              </DialogTitle>
            </DialogHeader>
            <DialogBody>
              <Text color={{ base: "gray.600", _dark: "gray.200" }}>
                This action cannot be undone.
              </Text>
            </DialogBody>
            <DialogFooter gap={3}>
              <DialogActionTrigger asChild>
                <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                  Cancel
                </Button>
              </DialogActionTrigger>
              <Button
                colorPalette="red"
                onClick={() => handleDeleteProduct(product._id)}
                autoFocus
              >
                Yes, Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Portal>
      </DialogRoot>
    </>
  );
};

export default ProductCard;
