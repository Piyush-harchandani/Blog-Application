import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import ListBlog from './pages/admin/ListBlog'
import Comments from './pages/admin/Comments'
import AddBlog from './pages/admin/AddBlog'
import Login from './components/admin/Login'
import 'quill/dist/quill.snow.css'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'

const App = () => {
  const {token} = useAppContext()
  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blog/:id' element={<Blog/>}/>
        <Route path='/admin' element={token ? <Layout/> : <Login/>}>
           <Route index element={<Dashboard/>} />
           <Route path='addBlog' i element={<AddBlog/>} />
           <Route path='listBlog' i element={<ListBlog/>} />
           <Route path='comments' i element={<Comments/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
