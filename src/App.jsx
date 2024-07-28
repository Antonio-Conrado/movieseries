import { BrowserRouter, Route, Routes } from "react-router-dom";

import Index from './pages/Index';
import Layout from "./layout/Layout";

//components
import Information from "./components/Information";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>} >
            <Route index element={<Index/>}/>
            <Route path="informacion/:id" element={<Information/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
