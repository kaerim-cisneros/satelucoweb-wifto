import React, { Component } from "react";
import axios from "axios";


export default class BlogForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            id: "",
            title: "",
            blog_status: "",
            content:"",
            featured_image: "",
            apiUrl:"https://hrsworkingtitle.devcamp.space/portfolio/portfolio_blogs",
            apiAction: "post"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    deleteImage(imageType){
        axios.delete(`https://api.devcamp.space/portfolio/delete-portfolio-blog-image/${this.props.blog.id}?image_type=${imageType}`,
              { withCredentials: true }
            ).then(response => {
             this.props.handleFeaturedImageDelete();
            }).catch(error => {
              console.log("deleteImage error", error);
            })
          
    }

    componentWillMount(){
        if (this.props.editMode) {
            this.setState({
                id: this.props.blog.id,
                title: this.props.blog.title,
                blog_status: this.props.blog.blog_status,
                apiUrl: `https://hrsworkingtitle.devcamp.space/portfolio/portfolio_blogs/${this.props.blog.id}`,
                apiAction: 'patch'
            })
        }
    }

    componentConfig(){
        return {
            iconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
        };
    }

    djsConfig(){
        return {
            addRemoveLinks: true,
            maxFiles: 1
        };
    }

    handleFeaturedImageDrop() {
        return {
          addedfile: file => this.setState({ featured_image: file })
        };
      }

    handleRichTextEditorChange(content) {
        this.setState({content});
    }

    buildForm(){
        let formData = new FormData();

        formData.append("portfolio_blog[title]", this.state.title);
        formData.append("portfolio_blog[blog_status]", this.state.blog_status);
        formData.append("portfolio_blog[content]", this.state.content*4);

        if (this.state.featured_image){
            formData.append(
                "portfolio_blog[featured_image]",
                this.state.featured_image
            );
        }

        return formData;
    }

    handleSubmit(event) {

        axios({
            method: this.state.apiAction,
            url: this.state.apiUrl,
            data: this.buildForm(),
            withCredentials: true
        })
             
        .then(response => {
          
            if (this.state.featured_image){
                this.featuredImageRef.current.dropzone.removeAllFiles();
                } 
            
            this.setState({
                title: "",
                blog_status: "",
                content: "",
                featured_image: ""
            });

            if (this.props.editMode) {
                this.props.handleUpdateFormSubmission(response.data.portfolio_blog);
            } else {
                this.props.handleSuccesfullFormSubmission(
                    response.data.portfolio_blog
              );
            }    
        }).catch(error =>{
            console.log("handleSubmit for blog error", error);
        });

        event.preventDefault();
      }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
  
    render() {
    return (
        <form onSubmit={this.handleSubmit} className="form-wrp">
            <h1>New Project</h1>
            <div className="form">
                <div className="form-login">
                    <div className="two-columns">
                        <input
                        type="text"
                        onChange={this.handleChange}
                        name="title"
                        placeholder="Project Name"
                        value={this.state.title}
                        />

                        <input
                        type="text"
                        onChange={this.handleChange}
                        name="blog_status"
                        placeholder="Blog Status"
                        value={this.state.blog_status}
                        />

                         <input
                        type="text"
                        onChange={this.handleChange}
                        name="content"
                        placeholder="How Many Hours"
                        value={this.state.content}
                        />
                    </div>
                    
                </div>
            </div>
        <button className="red-btn">Save</button>
      </form>
    );
  }
}