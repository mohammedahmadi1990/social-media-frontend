import React, { useState } from 'react';
import './NewPost.css';

function NewPost(props) {
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState(null);
  
  const backendURL = "http://localhost:5000"

  const handlePostSubmit = async () => {
    // First, upload the image to get a local file path or URL
    let imagePath = null;
    if (postImage) {
      const formData = new FormData();
      formData.append('image', postImage);

      try {
        const uploadResponse = await fetch(`${backendURL}/api/upload`, {  // Use the dynamic backendURL
          method: 'POST',
          body: formData
        });

        if (uploadResponse.status !== 200) {
          throw new Error('Failed to upload the image');
        }

        const uploadData = await uploadResponse.json();
        imagePath = uploadData.path;
      } catch (error) {
        console.error('Error uploading image:', error);
        return;
      }
    }

    // Now, send the post content and image path to the main server endpoint
    const post = {
      username: localStorage.getItem('username'),
      text: postText,
      image: imagePath
    };

    try {
      const response = await fetch(`${backendURL}/api/posts/create`, {  // Use the dynamic backendURL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "x-auth-token": localStorage.getItem('authToken'),
        },
        body: JSON.stringify(post)
      });

      if (response.status !== 200) {
        throw new Error('Failed to create the post');
      }

      console.log('New post created successfully');
      setPostText('');
      setPostImage(null);

      // Trigger the provided refresh function to update posts in the Home component
      props.refreshPosts();

    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setPostImage(event.target.files[0]);
    }
  };

  return (
    <div className="new-post-container">
      <textarea
        value={postText}
        onChange={e => setPostText(e.target.value)}
        placeholder="What's on your mind?"
        rows="3"
      />
      {postImage && <img src={URL.createObjectURL(postImage)} alt="Attached Preview" className="attached-image" />}
      <div className="post-controls">
        <label htmlFor="image-attach" className="attach-button">
          Attach Image
          <input
            type="file"
            id="image-attach"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </label>
        <button onClick={handlePostSubmit} className="submit-post-btn">Post</button>
      </div>
    </div>
  );
}

export default NewPost;
