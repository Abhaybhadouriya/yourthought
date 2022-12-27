import React from 'react'
import Footer from './footer/Footer'
// import Header from '../containers/Header'
import FilterPage from './blogs/FilterPage'
import Header from './header/Header'
const LoggedIn = (props) => {
  return (
    <>
    <Header props={props}/>
    <FilterPage props={props}/>
    <Footer/>
    </>
  )
}

export default LoggedIn