import { Container, SimpleGrid, Text, VStack, Spinner, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

export const Homepage = () => {
    const products = useProductStore((state) => state.products);
    const fetchProducts = useProductStore((state) => state.fetchProducts);
    
    // 1. Create a state to track if we are currently loading
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 2. Create an async function inside useEffect to handle the timing
        const loadProducts = async () => {
            setIsLoading(true);   // Ensure loading is true when we start
            await fetchProducts(); // Wait for the database to return the data
            setIsLoading(false);  // Turn off loading once data is received
        };

        loadProducts();
    }, [fetchProducts]);

    return (
        <Container maxW='container.xl' py={12}>
            <VStack spacing={8}>
                <Text
                    fontSize={"30"}
                    fontWeight={"bold"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={"text"}
                    textAlign={"center"}
                >
                    Current Products 🚀
                </Text>

                {/* 3. Show a loading spinner if isLoading is true */}
                {isLoading && (
                    <Center py={10}>
						<h2 style={{ color: 'blue.500', fontWeight: 'bold', fontSize: '40px' }}>Loading products...</h2>
						<Spinner size='xl' color='blue.500' thickness='4px' />
					</Center>
				)}

                {/* 4. Only show the grid if we are NOT loading */}
                {!isLoading && (
                    <SimpleGrid
                        columns={{
                            base: 1,
                            md: 2,
                            lg: 3,
                        }}
                        spacing={10}
                        w={"full"}
                    >
                        {products.filter(Boolean).map((product) =>
                            product && product._id ? (
                                <ProductCard key={product._id} product={product} />
                            ) : null
                        )}
                    </SimpleGrid>
                )}

                {/* 5. Only show 'No products found' if we are NOT loading AND the array is empty */}
                {!isLoading && products.length === 0 && (
                    <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
                        No products found 😢{" "}
                        <Link to={"/CreateProduct"}>
                            <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                                Create a product
                            </Text>
                        </Link>
                    </Text>
                )}
            </VStack>
        </Container>
    );
}

export default Homepage;