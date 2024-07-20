import { BrowserRouter, Route, Routes } from "react-router-dom";

import Index from './pages/Index';
import Layout from "./layout/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>} >
            <Route index element={<Index/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
