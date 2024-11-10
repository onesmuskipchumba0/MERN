import { Box, Image, Text, VStack, Badge, Flex, Button } from '@chakra-ui/react'
import React from 'react'
import { LuFileEdit, LuTrash } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
const ProductCard = ({product}) => {
    const navigate = useNavigate();

    const onProductClick = () => {
        navigate(`/product/${product._id}`);
    }
    const onUpdate = () => {
        navigate(`/update/${product._id}`);
    }
    const onDelete = () => {
        navigate(`/delete/${product._id}`);
    }
  return (
    <Box
      bg="gray.800"
      borderRadius="lg"
      boxShadow="md"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'dark-lg',
      }}
      maxW="300px"
    >
      <Box 
        height="200px" 
        paddingVertical={4}
        bg="gray.700"
      >
        <Image
          src={product.image}
          alt={product.name}
          width="100%"
          height="100%"
          objectFit="contain"
          borderRadius="lg"
          bg="gray.800"
          p={2}
        />
      </Box>

      <VStack p={4} spacing={2} align="stretch">
        <Flex justify="space-between" align="center">
          <Text
            fontSize="md"
            fontWeight="semibold"
            color="gray.100"
            noOfLines={1}
          >
            {product.name}
          </Text>
          <Text
            fontSize="md"
            fontWeight="bold"
            color="teal.300"
          >
            ${product.price}
          </Text>
        </Flex>

        <Badge
          colorScheme="teal"
          px={2}
          py={0.5}
          borderRadius="full"
          width="fit-content"
          fontSize="xs"
        >
          {product.category}
        </Badge>

        <Text
          color="gray.400"
          fontSize="sm"
          noOfLines={2}
        >
          {product.description}
        </Text>

        <Text
          fontSize="xs"
          color="gray.500"
        >
          Added {new Date(product.createdAt).toLocaleDateString()}
        </Text>
        <div className="flex justify-center gap-2">
          <button onClick={onUpdate} className="flex items-center gap-2 text-sm px-4 py-2 rounded-md border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-colors">
            <LuFileEdit />
            Update
          </button>
          <button onClick={onDelete} className="flex items-center gap-2 text-sm px-4 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
            <LuTrash />
            Delete
          </button>
        </div>
      </VStack>
    </Box>
  )
}

export default ProductCard