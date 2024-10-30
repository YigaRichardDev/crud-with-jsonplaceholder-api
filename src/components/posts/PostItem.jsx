import React from "react";
import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  // Ensure post is not undefined
  if (!post) {
    return (
      // message where post is not defined
      <tr>
        <td colSpan="3">No post data available</td>
      </tr>
    ); 
  }

  return (
    <tr>
      <td>{post.id}</td> 
      <td>{post.title}</td>
      <td>
        <Link to={`/post/${post.id}`}>Read More</Link>
      </td>
    </tr>
  );
};

export default PostItem;
