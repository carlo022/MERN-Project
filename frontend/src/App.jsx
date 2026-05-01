import { Box } from "@chakra-ui/react"
import Navbar from "./components/Navbar"
import { Route, Routes } from "react-router-dom"
import { CreateProduct, Homepage } from "./pages/index.jsx"

function App() {

  return (
    <Box minH={"100vh"}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/Homepage" element={<Homepage/>}/>
        <Route path="/CreateProduct" element={<CreateProduct/>}/>
      </Routes>
    </Box>
  )
}

export default App
