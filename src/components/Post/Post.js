import React, { useState } from 'react';
import './Post.css';
import Comment from '../Comment/Comment';
import axios from 'axios';

function Post({ post, comments }) {
  const [newComment, setNewComment] = useState(''); 
  const [localComments, setLocalComments] = useState(comments || []);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  }

  const handleSendComment = async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('Authentication token is missing. Please login again.');
      // Optionally, you can navigate the user to the login page or display a message.
      return;
    }

    if (newComment.trim()) {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/posts/${post._id}`,
          { text: newComment },
          {
            headers: {
              "x-auth-token": token, // Add the token to the headers
              "Content-Type": "application/json"
            }
          }
        );

        if (response.data) {
          setLocalComments(prevComments => [...prevComments, response.data]);
          console.log('Comment added:', response.data);
          setNewComment(''); // Clear the textarea after sending
        }
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  }

  return (
    <article className="post">
      <header className="post-header d-flex justify-content-start align-items-center">
        <div className="user-info">
          <i className="fa fa-user-circle"></i>
          {post.username || 'Unknown User'}
        </div>
      </header>
      <div className="post-content">
        {post.image && <img src={`http://localhost:5000/${post.image}`} alt="Post Media" />}
        <div className="post-icons">
          <div className="left-icons">
            <i className="far fa-heart"></i>
            <i className="far fa-comment"></i>
            <i className="far fa-paper-plane"></i>
          </div>
          <div className="right-icon">
            <i className="far fa-bookmark"></i>
          </div>
        </div>
        {post.likes && post.likes.length > 0 && <p className="likes-count">Likes: {post.likes.length}</p>}
        <div className="post-description">
          {post.text && post.text.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="post-comments">
          {comments.map(comment => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>
        <div className="post-comments">
          {localComments.map(comment => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>
        <div className="post-form-comments">
          <textarea 
            value={newComment} 
            onChange={handleCommentChange}
            placeholder="Add a comment..."
            rows="1"
          />
          <button onClick={handleSendComment}>Send</button>
        </div>
      </div>
    </article>
  );
}

export default Post;
