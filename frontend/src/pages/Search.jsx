import { Box, Container, SimpleGrid, Text, } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import ProductCard from '../components/ProductCard'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const Search = () => {
    const {name} = useParams()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        getProducts()
    }, [name])

    const getProducts = async () => {
        setLoading(true)
        try {
            console.log(name)
            const response = await axios.get(`http://localhost:5000/api/products/search/?name=${name}`)
            setProducts(response.data?.products)
            console.log(response.data?.products)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

  return (
    <Box minH={"100vh"} width={'100%'}>
        <NavBar/>
        <Container maxW={'container.xl'} py={8}>
            {loading && <Text>Loading...</Text>}
            {error && <Text>Error: {error.message}</Text>}
            {products.length === 0 ? (
                <Text fontSize="lg" textAlign="center">No products found matching "{name}"</Text>
            ) : (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </SimpleGrid>
            )}
        </Container>
    </Box>
  )
}

export default Search