import React from "react";
import { ThreeDots } from "react-loader-spinner";

const LoaderPage = () => {
  return (
    <div
      className="container"
      style={{ height: "100vh", width: "100%", position: "relative",    display: 'flex',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center' }}
    >
     
        <ThreeDots 
      height="128" 
      width="128" 
      radius="9"
      color="rgb(50,150,250)" 
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
       />
     
    </div>
  );
};

export default LoaderPage;