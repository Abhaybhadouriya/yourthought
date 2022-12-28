import React from 'react'
import Footer from './footer/Footer'
import FilterPage from './blogs/FilterPage'
import Header from './header/Header'
import HeaderBlog from './header/HeaderBlog'
const LoggedIn = (props) => {
  return (
    <>
    <HeaderBlog/>
    
    <Header props={props}/>
    <FilterPage props={props}/>
    <Footer/>
    </>
  )
}

export default LoggedIn