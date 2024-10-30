import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { usePosts } from '../../hooks/usePosts';

const PostForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { posts, createPost, updatePost } = usePosts();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Load existing post data if in edit mode
  useEffect(() => {
    if (posts && Array.isArray(posts)) {
      const existingPost = posts.find((post) => post.id === parseInt(id, 10));
      if (existingPost) {
        setTitle(existingPost.title);
        setBody(existingPost.body);
      }
    }
  }, [posts, id]);

  // Handle form submission for creating or updating a post
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (id) {
        // If ID exists, update the post
        await updatePost({ id: parseInt(id, 10), title, body });
        navigate('/', { state: { successMessage: 'Post updated successfully!' } });
        localStorage.setItem('successMessage', 'Post updated successfully!');
      } else {
        // If no ID, create a new post
        await createPost({ title, body });
        navigate('/', { state: { successMessage: 'Post created successfully!' } });
        localStorage.setItem('successMessage', 'Post created successfully!');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h5 className='text-center my-3'>{id ? 'Update Post' : 'Create Post'}</h5>
      {/* Display errors  */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <form onSubmit={handleSubmit} className='bg-white col-md-6 mx-auto border p-5 shadow-sm'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label">Body</label>
          <textarea
          rows={8}
            id="body"
            className="form-control"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="my-3">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : id ? 'Update Post' : 'Create Post'}
        </button>
        <Link to={'/'}>
        <button className='btn btn-secondary mx-3'>Back</button>
        </Link>
        </div>
        
      </form>
    </div>
  );
};

export default PostForm;
