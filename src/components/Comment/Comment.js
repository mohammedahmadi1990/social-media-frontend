import React from 'react';
import './Comment.css';

function Comment({ comment }) {
    return (
        <div className="comment-box">
            <div className="comment">
                <div className="user-info">
                    <i className="fa fa-user-circle"></i>
                    <span>
                        <strong>{comment.user.username}</strong>
                        <span className="comment-date">{new Date(comment.date).toLocaleString()}</span>
                    </span>
                </div>
                <p>{comment.text}</p>
            </div>
        </div>
    );
}

export default Comment;
