import React from "react";
import { Link } from "react-router-dom";
import TimeButtoms from "../project/time_buttoms";

const BlogItem = props => {
    
  

    const {
        content,
        title,  
    } = props.blogItem;

    var hrs = content / 4
 
    

    return (
        <div className="blog-entry-wrp latest-entry featured-entry " >
            <div className="blog-entry-image">
            </div>
            <div className="blog-entry-text-wrp">
            Project Name: {title}
            </div>
           
            <div> 
                Hours Left: {hrs}
            </div>
            <TimeButtoms/>     
        </div>
    );
};

export default BlogItem;