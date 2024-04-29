import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { BlogContext } from "../store/BlogContext";

const BlogForm = ({ closeModal, blogToEdit }) => {

  const {  editBlog, setBlogs } = useContext(BlogContext);
  const [blog, setBlog] = useState({
    imageLink: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    if (blogToEdit) {
      setBlog(blogToEdit);
    }
  }, [blogToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!blog.title.trim() || !blog.description.trim()) return;

    try {
      if (blogToEdit) {
        await editBlog(blogToEdit.id, blog);
      } else {
         await axios.post(
          "https://blog-website-c7ba7-default-rtdb.firebaseio.com/blogDetails.json",
          blog
        );
        const newBlog = {
          imageLink: blog.imageLink,
          title: blog.title,
          description: blog.description,
        };
        setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
      }
      setBlog({
        imageLink: "",
        title: "",
        description: "",
      });
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="blogForm" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Image Link"
        value={blog.imageLink}
        onChange={(e) => setBlog({ ...blog, imageLink: e.target.value })}
      />
      <input
        type="text"
        placeholder="Title"
        value={blog.title}
        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={blog.description}
        onChange={(e) => setBlog({ ...blog, description: e.target.value })}
      />
      <button type="submit">{blogToEdit ? "Update Blog" : "Add Blog"}</button>
    </form>
  );
};

export default BlogForm;
