import React, { useState } from "react";
import "./App.css";
import { BlogProvider } from "./store/BlogContext";
import Modal from "./Modal/Modal";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [blogToEdit, setBlogToEdit] = useState(null);

  const toggleModal = (blog = null) => {
    setBlogToEdit(blog);
    setShowModal(!showModal);
  };

  return (
    <BlogProvider>
      <div className="App">
        <div className="container">
          <div className="heading">
            <h1>Blog App</h1>
            <button onClick={() => toggleModal()}>Add New Blog</button>
          </div>

          {showModal && (
            <Modal>
              <BlogForm closeModal={toggleModal} blogToEdit={blogToEdit} />
              <button onClick={() => toggleModal()}>Close</button>
            </Modal>
          )}
          <BlogList toggleModal={toggleModal} />
        </div>
      </div>
    </BlogProvider>
  );
};

export default App;
