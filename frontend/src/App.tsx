import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import  { Toaster } from 'react-hot-toast';
import Blog from './pages/Blog'
import Blogs from './pages/Blogs';
import Create from './pages/Create';
import UpdateBlog from './pages/UpdateBlog';

function App() {

  return (
   <>
   <Router>
    <Routes>
      <Route path='/signup' element={<Signup/>}  />
      <Route path='/signin' element={<Signin/>}  />
      <Route path='/blog/:id' element={<Blog/>}  />
      <Route path='/' element={<Blogs/>}  />
      <Route path='/create' element={<Create/>}  />
      <Route path='/update/:id' element={<UpdateBlog/>}  />
    </Routes>
   </Router>
   <Toaster />
   </>
  )
}

export default App
