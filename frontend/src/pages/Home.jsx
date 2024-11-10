import { Box, Container, Text, SimpleGrid } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data.products);
            console.log(response.data.products);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box minH={"100vh"} width={'100%'}>
            <NavBar/>
            <Container maxW={'container.xl'} py={8}>
                {loading && <Text>Loading...</Text>}
                {error && <Text>Error: {error.message}</Text>}
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {products.length > 0 && products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    )
}
