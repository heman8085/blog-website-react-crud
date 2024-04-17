import React, { useContext } from "react";
import axios from "axios";
import { BlogContext } from "../store/BlogContext";

const BlogList = ({ toggleModal }) => {
  const { blogs, setBlogs } = useContext(BlogContext);

  const handleDelete = async (id) => {
    try {
      // Send DELETE request to the API
      await axios.delete(
        `https://crudcrud.com/api/54b054875aee4af78ce68ea72caf0288/blogDetails/${id}`
      );

      // Update state after successful deletion
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <ul className="allBlogs">
      {blogs.map((blog) => (
        <li className="singleBlog" key={blog._id}>
          <img src={blog.imageLink} alt={blog.title} width="200" height="200" />
          <div>
            <h2>{blog.title}</h2>
            <p>{blog.description}</p>
          </div>
          <div>
            <button onClick={() => toggleModal(blog)}>Edit</button>
            <button onClick={() => handleDelete(blog._id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BlogList;
