import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css'

const API_URL = 'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=';

const PollingApp = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL + page);
        const { hits } = response.data;

        setPosts((prevPosts) => [...prevPosts, ...hits]);
        setPage((prevPage) => prevPage + 1);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); 

    return () => clearInterval(interval); 
  }, [page]);

  return (
    <div>
      <h1>Polling App</h1>
      <table className="post-table">
        <thead>
          <tr>
            <th className="table-header">Title</th>
            <th className="table-header">URL</th>
            <th className="table-header">Created At</th>
            <th className="table-header">Author</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.objectID} className="post-row">
              <td>{post.title}</td>
              <td>
                <a href={post.url} target="_blank" rel="noreferrer">
                  {post.url}
                </a>
              </td>
              <td>{new Date(post.created_at).toLocaleString()}</td>
              <td>{post.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PollingApp;
