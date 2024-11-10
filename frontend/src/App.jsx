import { Button } from "@chakra-ui/react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import CreatePage from "./pages/CreatePage"
import UpdatePage from "./pages/UpdatePage"
import DeletePage from "./pages/DeletePage"
import Search from "./pages/Search"

function App() {
 
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/update/:id" element={<UpdatePage />} />
        <Route path="/delete/:id" element={<DeletePage />} />
        <Route path="/search/:name" element={<Search />} />
      </Routes>  
    </BrowserRouter>
    </>
  )
}

export default App
