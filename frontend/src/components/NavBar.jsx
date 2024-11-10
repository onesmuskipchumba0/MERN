import { Box, Container, HStack, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { LuPlus, LuPackage, LuSearch } from 'react-icons/lu'
import { Link } from 'react-router-dom'

export default function NavBar () {
    const [search, setSearch] = useState('');

  const handleSearch = () => {
    console.log('Search clicked');
  };
  return (
    <Box justifyContent={'center'} padding={5} className='flex w-full bg-slate-800 items-center'>
        <HStack width={'100%'}>
            <Box justifyContent={'space-between'} className='flex items-center' width={'100%'} gap={6}>
              <Link to="/" className='text-white flex items-center gap-2 hover:text-slate-300'>
                <LuPackage size={20} />
                Products
              </Link>

              {/* Search */}
              <Box className='bg-slate-700 flex items-center justify-center rounded-md hover:bg-slate-600 border-slate-600 w-[400px] relative' >
                <LuSearch onClick={handleSearch} className='cursor-pointer absolute left-3 top-3 text-slate-400 hover:text-slate-300 cursor-pointer' />
                <Input value={search} onChange={(e) => setSearch(e.target.value)} pl={10} className='ml-10 w-[90%]' placeholder='Search products...' color='white' />
              </Box>

              {/* Create */}
              <Link className='bg-slate-600 hover:bg-slate-500 hover:text-white text-white p-2 rounded-md' to="/create">
                <LuPlus/>
              </Link>
            </Box>
        </HStack>
    </Box>
  )
}
