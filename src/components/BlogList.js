import React, { useContext } from "react";
import axios from "axios";
import { BlogContext } from "../store/BlogContext";

const BlogList = ({ toggleModal }) => {
  const { blogs, setBlogs } = useContext(BlogContext);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://blog-website-c7ba7-default-rtdb.firebaseio.com/blogDetails/${id}.json`
      );
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul className="allBlogs">
      {blogs.map((blog) => (
        <li className="singleBlog" key={blog.id}>
          <img src={blog.imageLink} alt={blog.title} width="300" height="300" />
          <div>
            <h2>{blog.title}</h2>
            <p>{blog.description}</p>
          </div>
          <div>
            <button onClick={() => toggleModal(blog)}>Edit</button>
            <button onClick={() => handleDelete(blog.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BlogList;
