import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BlogItem from "../blog/blog-item";
import BlogModal from "../modals/blog-modal";



class ProjectDB extends Component {
  constructor(){
    super();

    this.state ={
      blogItems: [],
      totalCount: 0,
      currentPage: 0,
      isLoading: true
    };

    this.getBlogItems = this.getBlogItems.bind(this);
    this.onScroll = this.onScroll.bind(this);
    window.addEventListener("scroll", this.onScroll, false);
    this.handleNewBlogClick = this.handleNewBlogClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleSuccesfullNewBlogSubmission = this.handleSuccesfullNewBlogSubmission.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
}
  handleDeleteClick(blog){
    axios.delete(`https://api.devcamp.space/portfolio/portfolio_blogs/${blog.id}`, {withCredentials: true}
    ).then(response => {
      this.setState({
        blogItems: this.state.blogItems.filter(blogItem => {
          return blog.id !== blogItem.id
        })
      });
      return response.data;
    }).catch( error => {
      console.log("delete blog error", error);
    });
  }

  handleSuccesfullNewBlogSubmission(blog){
    this.setState({
      blogModalIsOpen: false,
      blogItem: [blog].concat(this.state.blogItems)
    })
  }
   
  handleModalClose(){
    this.setState({
      blogModalIsOpen:false
    });
  } 

  handleNewBlogClick() {
    this.setState({
      blogModalIsOpen:true
    });
  } 
  
  onScroll() {
      if (this.state.isLoading || 
          this.state.blogItems.length === this.state.totalCount) {
        return;
      }

      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
        this.getBlogItems();
      }
  };
  

  getBlogItems(){
    this.setState({
      currentPage: this.state.currentPage + 1
    })
    axios
      .get(`https://hrsworkingtitle.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`, {
        withCredentials: true
      })
      .then(response => {
        console.log("getting", response.data);
        this.setState({
          blogItems: this.state.blogItems.concat(response.data.portfolio_blogs),
          totalCount: response.data.meta.total_records,  
          isLoading: false
        });
      })
      .catch(error => {
        console.log("getBlogItems error", error);
      });
  }

  componentWillMount() {
    this.getBlogItems();
  }

  componentWillUnmount(){
    window.removeEventListener("scroll", this.onScroll, false);
  }

  render() {
    const projectRecords = this.state.blogItems.map(blogItem => {
     
        return (
          <div key={blogItem.id} className="admin-blog-wrp">
            <BlogItem key={blogItem.id} blogItem = {blogItem} />
            <a className="delete-blog" onClick={() => this.handleDeleteClick(blogItem)}>
             Delete
            </a>
          </div>
        )
      
    });

    return<div className="blog-body">
            <div className="blog-wrp">
           {/* {this.props.loggedInStatus === "LOGGED_IN" ? ( */}
              <div className="new-blog-link">
                  <a onClick={this.handleNewBlogClick}>
                    Add Project
                  </a>
              </div>
            {/*) : null}*/}
              <div className="blog-wrp-top-border">
                <div className="blog-wrp-top-border-title">
                      <BlogModal
                        handleSuccesfullNewBlogSubmission = {this.handleSuccesfullNewBlogSubmission}
                        handleModalClose={this.handleModalClose}
                        modalIsOpen={this.state.blogModalIsOpen}
                      />

                     

                    <h1>Projects</h1>
                </div>
              </div>
              <div>
                {projectRecords}
              </div>
              {this.state.isLoading ? (
              <div className="content-loader">
                O
              </div>) : null}
            </div>
          </div>;
  }
}

export default ProjectDB;
