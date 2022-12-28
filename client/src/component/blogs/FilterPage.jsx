import React, { useEffect, useState } from "react";
import BlogTile from "./BlogTile";
import axios from "axios";
import SorryNoBlogs from "./SorryNoBlogs";
import { URL_BASE } from "../../services/constant";
import LoaderPage from "../LoaderPage";
const FilterPage = (props) => {
  const [data, setdata] = useState([]);
  const style = {
    padding: 10,
    backgroundImage: "url(/background.jpg)",
    placeContent: "flex-start center",
    display: "flex",
    // flexDirection: "column",
    // alignContent: "flex-start",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    minHeight: "90vh",
  };
  
  useEffect(() => {
    let query = "";
    if (props.props.searchQuery !== undefined)
      query = props.props.searchQuery.data;
    axios({
      url: `${URL_BASE}documents/filterList`,
      changeOrigin: true,
      method: "get",
      params: { query: query },
    }).then((res) => {
      setdata(res.data.document);
      console.log(res.data.document);
    });
  }, [props.props.searchQuery]);

  return (
    <div style={style}>
      

      {data === [] ? (
        <LoaderPage />
      ) : (
        <>
          {data.length !== 0 ? (
            data.map((e, i) => {
              return (
                <BlogTile
                  key={i}
                  name={e["User"]["name"]}
                  date={e["createdAt"]}
                  title={e["title"]}
                  tags={e["tags"]}
                  id={e["id"]}
                />
              );
            })
          ) : (
            <SorryNoBlogs />
          )}
        </>
      )}
    </div>
  );
};

export default FilterPage;
