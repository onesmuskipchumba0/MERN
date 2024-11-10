import { Box, Button, Container, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { MdAdd, MdArrowBack } from 'react-icons/md'

const CreatePage = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const navigate = useNavigate()

    const url = 'http://localhost:5000/api/products'
    
    const handleCreate = async () => {
        try {
            if(!name || !price || !quantity || !image || !description || !category) {
                alert('Please fill all the fields')
                return
            }
            const productData = {
                name,
                price: Number(price),
                quantity: Number(quantity),
                image,
                description,
                category
            }
            const response = await axios.post(url, productData)
            console.log(response);
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box minH="100vh" bg="gray.900">
            <NavBar/>
            <Container maxW="container.md" py={8}>
                <Box mb={8}>
                    <Button
                        leftIcon={<MdArrowBack />}
                        variant="ghost"
                        color="gray.400"
                        mb={4}
                        onClick={() => navigate('/')}
                        _hover={{ color: 'white', bg: 'gray.700' }}
                    >
                        Back to Products
                    </Button>
                    <Heading 
                        color="white" 
                        size="lg"
                        textAlign="center"
                    >
                        Create New Product
                    </Heading>
                </Box>

                <Box 
                    bg="gray.800" 
                    p={8} 
                    borderRadius="xl" 
                    boxShadow="2xl"
                    border="1px"
                    borderColor="gray.700"
                >
                    <Box className='flex flex-col gap-6'>
                        <div className="space-y-2">
                            <label className="text-gray-300 text-sm font-medium">Product Name</label>
                            <input 
                                className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-teal-500 focus:outline-none transition-colors"
                                placeholder='Enter product name'
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                type="text"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-gray-300 text-sm font-medium">Price</label>
                                <input
                                    className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-teal-500 focus:outline-none transition-colors"
                                    placeholder='Enter price'
                                    onChange={(e) => setPrice(e.target.value)}
                                    value={price}
                                    type="number"
                                    min="0"
                                    step="0.01"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-gray-300 text-sm font-medium">Quantity</label>
                                <input
                                    className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-teal-500 focus:outline-none transition-colors"
                                    placeholder='Enter quantity'
                                    onChange={(e) => setQuantity(e.target.value)}
                                    value={quantity}
                                    type="number"
                                    min="0"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-gray-300 text-sm font-medium">Category</label>
                            <input
                                className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-teal-500 focus:outline-none transition-colors"
                                placeholder='Enter category'
                                onChange={(e) => setCategory(e.target.value)}
                                value={category}
                                type="text"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-gray-300 text-sm font-medium">Image URL</label>
                            <input
                                className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-teal-500 focus:outline-none transition-colors"
                                placeholder='Enter image URL'
                                onChange={(e) => setImage(e.target.value)}
                                value={image}
                                type="text"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-gray-300 text-sm font-medium">Description</label>
                            <textarea
                                className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-teal-500 focus:outline-none transition-colors resize-none"
                                placeholder='Enter product description'
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                rows={4}
                            />
                        </div>

                        <div className="flex flex-col gap-3 pt-4">
                            <Button
                                background={"teal.500"}
                                className='mx-auto p-5 hover:-translate-y-1 transition-all duration-200'
                                size="lg"
                                onClick={handleCreate}
                                leftIcon={<MdAdd />}
                                _hover={{ transform: 'translateY(-1px)' }}
                                transition="all 0.2s"
                            >
                                Create Product
                            </Button>
                        </div>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default CreatePage