import React, { useState } from "react";
import PostItem from "./PostItem";
import Pagination from "../pagination/Pagination";
import SearchBar from "../search/SearchBar"; 

const PostList = ({ posts, currentPage, onPageChange, totalPages }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter posts based on the search term
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-3">
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostItem key={post.id} post={post} />
              ))
            ) : (
              <tr>
                <td colSpan="3">No posts found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
     
      {/* Pass pagination props to the Pagination component */}
      <Pagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages}
      />
    </div>
  );
};

export default PostList;
