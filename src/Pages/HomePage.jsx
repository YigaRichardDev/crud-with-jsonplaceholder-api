import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import PostList from "../components/posts/PostList";
import { getPosts } from "../services/postService";
import { Link } from "react-router-dom";
import Loader from "../components/common/Loader";

const POSTS_PER_PAGE = 8;

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1); // Track current pagination page
  const [successMessage, setSuccessMessage] = useState(null); // Message for actions like post creation or deletion

  // Fetch posts with react-query and handle loading and error states
  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"], 
    queryFn: getPosts,   
  });

  // check local storage for any success message to display
  useEffect(() => {
    const message = localStorage.getItem('successMessage');
    if (message) {
      setSuccessMessage(message);
      localStorage.removeItem('successMessage'); // Clear message after use
    }
  }, []);

  // Clear the success message after 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null); 
      }, 5000);
      return () => clearTimeout(timer); 
    }
  }, [successMessage]);

  // Calculate the total number of pages
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  // Posts to display on the current page
  const currentPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Update the current page number
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Show loader while data is being fetched
  if (isLoading) return <Loader />;
  
  // Display error message if fetch fails
  if (error) return <div className="container mt-3">Error loading posts.</div>;

  return (
    <div className="my-3">
      <div className="container">
        {/* Show success message if it exists */}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <div className="text-center">
          <h4>All Posts</h4>
        </div>
        <Link to={'/create-post'}>
          <button className="btn btn-primary btn-sm">Create New Post</button>
        </Link>
      </div>
      <PostList
        posts={currentPosts}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
};

export default HomePage;
