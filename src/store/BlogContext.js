import React, { createContext, useState ,useEffect} from "react";
import axios from "axios";

const BlogContext = createContext();

const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://redux-cart-a46f9-default-rtdb.firebaseio.com/blogDetails.json"
      )
      .then((response) => {
        const data = response.data;
        const loadedBlog = [];
        for (const key in data) {
          loadedBlog.push({
            id: key,
            title: data[key].title,
            imageLink: data[key].imageLink,
            description: data[key].description,
          });
        }
        setBlogs(loadedBlog);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setBlogs]);


  const editBlog = (id, newData) => {
    const updatedBlogs = blogs.map((blog) =>
      blog.id === id ? { ...blog, ...newData } : blog
    );
    setBlogs(updatedBlogs);
  };

  return (
    <BlogContext.Provider value={{ blogs, editBlog, setBlogs }}>
      {children}
    </BlogContext.Provider>
  );
};

export { BlogProvider, BlogContext };
