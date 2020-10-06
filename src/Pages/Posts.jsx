import "./Posts.css";
import React, { useEffect, useState } from "react";
import loadData from "../helpers/loadData";

function Posts({ staticContext = {} }) {
  const [posts, setPosts] = useState(
    staticContext.data ? staticContext.data : []
  );
  useEffect(() => {
    if (window.__ROUTE_DATA__) {
      setPosts(window.__ROUTE_DATA__);
      delete window.__ROUTE_DATA__;
    } else {
      loadData("posts").then((data) => setPosts(data));
    }
  }, []);

  return (
    <div className="posts">
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <a href={post.url} target="_blank" rel="noopener noreferrer">
            {post.title}
          </a>
          <pre>{post.body}</pre>
        </div>
      ))}
    </div>
  );
}

export default Posts;
