import React,{useEffect,useState} from 'react'
import BlogTile from './BlogTile'
import axios from "axios";
import SorryNoBlogs from './SorryNoBlogs';

const FilterPage = (props) => {
  const url = process.env.REACT_APP_API_BASE_URL
  const [data, setdata] = useState([])

  useEffect(() => { 
   let query=''
    if(props.props.searchQuery!=undefined)
         query = props.props.searchQuery.data
    axios({url:`${url}documents/filterList`,
      changeOrigin: true,
      method:'get',
      params: {query:query} 
  }).then((res)=>{
      setdata(res.data.document)
      console.log(res.data.document);
     
    })
  }, [props.props.searchQuery]) 
  
  return (
    <div>{data.length!=0?data.map((e)=>{
      
    })
    :<SorryNoBlogs/>}</div>
  )
}

export default FilterPage