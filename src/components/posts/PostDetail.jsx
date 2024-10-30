import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { getPosts } from "../../services/postService"; 
import { usePosts } from "../../hooks/usePosts"; 
import { Link } from 'react-router-dom';
import Loader from "../common/Loader";

const PostDetail = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate(); // Initialize navigate
  const { deletePost: deletePostMutation } = usePosts(); 
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch post details
  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Get all posts and find the one with the matching ID
        const posts = await getPosts();
        const foundPost = posts.find((post) => post.id === parseInt(id, 10));

        // Handle case where post is not found
        if (!foundPost) {
          throw new Error("Post not found");
        }
        setPost(foundPost);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Call fetch function
    fetchPost();
  }, [id]);

  // Handle post deletion
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePostMutation(parseInt(id, 10)); 
        navigate('/', { state: { successMessage: 'Post deleted successfully!' } }); // Redirect with success message
        localStorage.setItem('successMessage', 'Post deleted successfully!');
      } catch (err) {
        setError(err.message); 
      }
    }
  };

  // Render loading state
  if (loading) return <Loader/>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>No post found</p>;

  return (
    <div className="container mt-5">
      <div className="col-md-6 mx-auto border p-5 shadow-sm bg-white">
        <h4 className="text-center text-muted">Post Details</h4>
        <hr />
        <div className="my-3">
          <h5>Title:</h5>
          <h6>{post.title}</h6>
        </div>
        <div className="my-3">
          <h5>Body:</h5>
          <p>{post.body}</p>
        </div>
        <div className="my-3">
          <Link to={`/edit-post/${post.id}`}>
            <button className="btn-warning btn-sm btn">Edit</button>
          </Link>
          <button onClick={handleDelete} className="btn-danger btn-sm btn mx-3">
            Delete
          </button>
          <Link to={'/'}>
            <button className="btn-secondary btn-sm btn">Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
