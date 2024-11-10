import { Box, Container } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useNavigation, useParams } from 'react-router-dom'
import NavBar from '../components/NavBar'
import axios from 'axios'

const UpdatePage = () => {
  const { id } =  useParams()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const endpoint = `http://localhost:5000/api/products/${id}`

  const [product, setProduct] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    getProduct()
  }, [id])

  const getProduct = async () => {
    const res = await axios.get(endpoint)
    setProduct(res.data.product)
    console.log(res.data.product)
  }

  const updateProduct = async () => {
    const res = await axios.put(endpoint, {name, description, price, quantity, image, category})
    setProduct(res.data.product)
    navigate('/')
  }
  return (
    <Box>
      <NavBar/>
      <Container maxW={'container.xl'} py={8}>
        <Box className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="text-2xl font-bold text-white mb-6">Update Product: {product?.name}</div>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl text-white mb-4">Current Values</h3>
              <div className="text-gray-300">
                <p>Name: {product?.name}</p>
                <p>Description: {product?.description}</p>
                <p>Price: ${product?.price}</p>
                <p>Quantity: {product?.quantity}</p>
                <p>Category: {product?.category}</p>
                <p>Image URL: {product?.image}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl text-white mb-4">New Values</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-teal-500 focus:outline-none"
                />
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-teal-500 focus:outline-none"
                  rows={3}
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-teal-500 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-teal-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-teal-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-teal-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button 
            onClick={updateProduct}
            className="mt-8 w-full bg-teal-500 text-white py-3 px-6 rounded-lg hover:bg-teal-600 transition-colors"
          >
            Update Product
          </button>
        </Box>
      </Container>
    </Box>
  )
}

export default UpdatePage