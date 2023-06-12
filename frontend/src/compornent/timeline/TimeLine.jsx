import React, { useContext, useEffect, useState } from 'react';
import './TimeLine.css';
import Share from '../Share/Share';
import Post from '../post/post';
import axios from "axios";
import { AuthContext } from '../../state/AuthContext';

export default function TimeLine({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = username
          ? await axios.get(`/posts/profile/${username}`) //profile
          : await axios.get(`/posts/timeline/${user._id}`); //home
        setPosts(response.data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [username, user._id]);

  return (
    <div className='timeline'>
      <div className="timelineWrapper">
        <Share />
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
}
