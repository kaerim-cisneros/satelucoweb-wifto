import React from "react";

const BlogFuturedImage = props => {

    if(!props.img) {
        return null;
    }

    return (
        <div className="blog-wrp-detail-img">
            <img src={props.img}/>
        </div>
    )
}

export default BlogFuturedImage;