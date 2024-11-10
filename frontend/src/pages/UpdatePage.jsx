import { Box, Container } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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

  useEffect(() => {
    getProduct()
  }, [id])

  const getProduct = async () => {
    const res = await axios.get(endpoint)
    setProduct(res.data.product)
    console.log(res.data.product)
  }

  const updateProduct = async () => {
    const res = await axios.put(endpoint,{name, description, price, quantity, image, category})
    setProduct(res.data.product)
  }
  return (
    <Box>
      <NavBar/>
      <div>Update Product </div>
      <button>Update Product </button>
    </Box>
  )
}

export default UpdatePage