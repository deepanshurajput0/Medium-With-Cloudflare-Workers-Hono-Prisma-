import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import  { Toaster } from 'react-hot-toast';
import Blog from './pages/Blog'
import Blogs from './pages/Blogs';
import Create from './pages/Create';
import UpdateBlog from './pages/UpdateBlog';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
   const token = localStorage.getItem('token')
  return (
   <>
   <Router>
    <Routes>
      <Route path='/signup' element={
         !token ? <Signup/> : <Navigate to={'/'} />  
      }  />
      <Route path='/signin' element={
        !token ? <Signin/> : <Navigate to={'/'} />
      }  />
      <Route path='/blog/:id' element={
        <ProtectedRoute>
          <Blog/>
        </ProtectedRoute>
        }  />
      <Route path='/' element={
        <ProtectedRoute>
          <Blogs/>
        </ProtectedRoute>
      }  />
      <Route path='/create' element={
        <ProtectedRoute>
          <Create/>
        </ProtectedRoute>
      }  />
      <Route path='/update/:id' element={
        <ProtectedRoute>
          <UpdateBlog/>
        </ProtectedRoute>
        }  />
    </Routes>
   </Router>
   <Toaster />
   </>
  )
}

export default App
