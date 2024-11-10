import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { Box, Button, Container, Heading, Text, VStack, Center, HStack, Image, Badge } from '@chakra-ui/react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'

const DeletePage = () => {
    const { id } = useParams()
    const url = "http://localhost:5000/api/products"
    const navigate = useNavigate()

    const [product, setProduct] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await axios.get(`${url}/${id}`)
                setProduct(response.data.product)
            } catch (error) {
                setError(error.message)
                console.log(error)
            }
        }
        getProduct()
    }, [id])

    const deleteProduct = async () => {
        try {
            await axios.delete(`${url}/${id}`)
            navigate("/")
        } catch (error) {
            setError(error.message)
            console.log(error)
        }
    }

    const ProductPreview = ({ product }) => {
        return (
            <Box
                bg="gray.800"
                borderRadius="lg"
                overflow="hidden"
                w="full"
                boxShadow="lg"
            >
                <HStack spacing={0} align="stretch">
                    {/* Left Image Section */}
                    <Box w="250px" h="250px" bg="gray.700" p={4} flexShrink={0}>
                        <Image
                            src={product.image}
                            alt={product.name}
                            w="full"
                            h="full"
                            objectFit="contain"
                            borderRadius="md"
                            bg="gray.800"
                            p={2}
                        />
                    </Box>

                    {/* Right Content Section */}
                    <Box flex="1" p={6}>
                        <VStack align="start" spacing={4} h="full">
                            {/* Product Name and Price */}
                            <HStack justify="space-between" w="full">
                                <Heading
                                    size="md"
                                    color="gray.100"
                                    noOfLines={2}
                                >
                                    {product.name}
                                </Heading>
                                <Text
                                    fontSize="xl"
                                    fontWeight="bold"
                                    color="teal.300"
                                >
                                    KSH {product.price}
                                </Text>
                            </HStack>

                            {/* Category and Quantity */}
                            <HStack 
                                spacing={6} 
                                w="full"
                                pt={2}
                            >
                                <HStack>
                                    <Text color="gray.400">Category:</Text>
                                    <Badge colorScheme="teal" px={2} py={1}>
                                        {product.category}
                                    </Badge>
                                </HStack>
                                <HStack>
                                    <Text color="gray.400">Quantity:</Text>
                                    <Badge 
                                        colorScheme={product.quantity > 0 ? "green" : "red"}
                                        px={2} 
                                        py={1}
                                    >
                                        {product.quantity} in stock
                                    </Badge>
                                </HStack>
                            </HStack>

                            {/* Description */}
                            <Text
                                color="gray.400"
                                fontSize="md"
                                noOfLines={3}
                            >
                                {product.description}
                            </Text>

                            {/* Added Date */}
                            <Text
                                color="gray.500"
                                fontSize="sm"
                                mt="auto"
                            >
                                Added {new Date(product.createdAt).toLocaleDateString()}
                            </Text>

                            {/* Delete Confirmation Buttons */}
                            <HStack spacing={4} w="full" pt={4}>
                                <Button
                                    colorScheme="red"
                                    variant="solid"
                                    size="md"
                                    flex={1}
                                    onClick={deleteProduct}
                                    _hover={{
                                        bg: "red.600",
                                        transform: "translateY(-2px)",
                                        boxShadow: "lg"
                                    }}
                                >
                                    Confirm Delete
                                </Button>
                                <Button
                                    colorScheme="gray"
                                    variant="outline"
                                    size="md"
                                    flex={1}
                                    onClick={() => navigate("/")}
                                    _hover={{
                                        bg: "gray.700",
                                        transform: "translateY(-2px)",
                                        boxShadow: "lg"
                                    }}
                                >
                                    Cancel
                                </Button>
                            </HStack>
                        </VStack>
                    </Box>
                </HStack>
            </Box>
        )
    }

    return (
        <Box minH="100vh" bg="gray.900">
            <NavBar/>
            <Container maxW="container.md" py={8}>
                <VStack spacing={6}>
                    
                    {error && (
                        <Text color="red.300">
                            Error: {error}
                        </Text>
                    )}

                    {product && (
                        <VStack spacing={4}>
                            <Text className='my-5' color="white" fontSize="lg">
                                Are you sure you want to delete {product.name}?
                            </Text>
                            <ProductPreview product={product}/>
                            
                        </VStack>
                    )}
                </VStack>
            </Container>
        </Box>
    )
}

export default DeletePage