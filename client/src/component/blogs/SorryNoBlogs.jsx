import React from 'react'

const SorryNoBlogs = () => {
    const style={
        paddingTop: 30,
        paddingBottom: 30,
        fontSize: 22, 
        color: '#000000',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:'80vh'
    }
    return (
        <div style={style}>
            <i style={{fontSize:36}} className="fa fa-frown-o" aria-hidden="true" />
            <span>Nothing Found</span>
        </div>
    )
}

export default SorryNoBlogs