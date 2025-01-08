import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import  { Toaster } from 'react-hot-toast';
import Blog from './pages/Blog'
function App() {

  return (
   <>
   <Router>
    <Routes>
      <Route path='/signup' element={<Signup/>}  />
      <Route path='/signin' element={<Signin/>}  />
      <Route path='/blog' element={<Blog/>}  />
    </Routes>
   </Router>
   <Toaster />
   </>
  )
}

export default App
