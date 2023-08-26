import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Post from '../../components/Post/Post';
import './Home.css';
import NewPost from '../../components/NewPost/NewPost';

const fetchCommentsForPost = async (postId, token) => {
  try {
    const response = await fetch(`http://localhost:5000/api/posts/${postId}/comments`, {
      headers: {
        "x-auth-token": token,
      }
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch comments');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    return [];  // Return an empty array in case of any error
  }
};

const refreshPosts = async (setPosts, setComments, navigate) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    navigate('/login');
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/posts", {
      headers: {
        "x-auth-token": token,
      }
    });

    if (response.status === 401) {
      localStorage.removeItem('authToken');
      navigate('/login');
      throw new Error('Unauthorized');
    }

    const data = await response.json();
    setPosts(data);

    // Fetch comments for each post and set them in state
    const allComments = {};
    for (let post of data) {
      allComments[post._id] = await fetchCommentsForPost(post._id, token);
    }
    setComments(allComments);
    
  } catch (err) {
    if (err.message !== 'Unauthorized') {
      console.error("Error fetching posts:", err);
    }
  }
};

function Home() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});  // State to hold comments for each post
  const navigate = useNavigate();

  useEffect(() => {
    refreshPosts(setPosts, setComments, navigate);
  }, [navigate]);

  return (
    <div>      
      <Header isAuthenticated={!!localStorage.getItem('authToken')} username={localStorage.getItem('username')} />
      <main>
        <section id="posts-feed" className="container">
          <NewPost refreshPosts={() => refreshPosts(setPosts, setComments, navigate)} />
          {posts.length > 0 ? (
            posts.map(post => <Post key={post._id} post={post} comments={comments[post._id] || []} />)
          ) : (
            <p>No posts to display.</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;
