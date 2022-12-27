import React,{useState} from 'react'
import styles from "./Header.module.css"
const Header = (props) => {
  const [data, setdata] = useState(null)
  return (
    <div className={styles.outer}>
    <input className={styles.input} onChange={(e)=>setdata(e.target.value)}  placeholder="Search"/>
    <button className={styles.search} onClick={()=>props.props.searchQueryHandler({data:data})}><i className="fa fa-search" aria-hidden="true"/></button>
    </div>
  )
}

export default Header