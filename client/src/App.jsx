
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home' 
import { ProtectedRoute } from './components/ProtectRoute'
import HomeRedirect from './pages/HomeRedirect'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeRedirect />}/>
        <Route path='/signup'  element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<ProtectedRoute element={<Home />} />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
