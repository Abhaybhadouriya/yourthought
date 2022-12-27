import React from 'react'
import LoggedIn  from "./containers/HomeContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './component/Login';
import BlogReader from './component/blogs/BlogReader';
import Profile from './component/profile/Profile'
import SorryNoBlogs from './component/blogs/SorryNoBlogs';
function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route index element={<LoggedIn/>}/>
        <Route path='login' element={<Login />} />
        <Route path="blogs/:id"  element={<BlogReader/>} />
        <Route path="profile/:id" element={<Profile/>} />
        <Route path="*" element={<SorryNoBlogs />} />
     
    </Routes>
   </BrowserRouter>
      
  );
}

export default App;
