import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const BlogContext = createContext();

const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://crudcrud.com/api/54b054875aee4af78ce68ea72caf0288/blogDetails"
      )
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  const addBlog = (newBlog) => {
    setBlogs([...blogs, newBlog]);
  };

  const editBlog = (id, newData) => {
    const updatedBlogs = blogs.map((blog) =>
      blog.id === id ? { ...blog, ...newData } : blog
    );
    setBlogs(updatedBlogs);
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, editBlog, setBlogs }}>
      {children}
    </BlogContext.Provider>
  );
};

export { BlogProvider, BlogContext };
