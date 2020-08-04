import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get('http://localhost:8000/api/posts')
      .then(res => {
        setPosts(res.data);
        setIsLoading(false);
      })
  }, []);

  return (
    <div className="App">
      <h1>Posts</h1>
      {isLoading && <h2>Loading...</h2>}
      <div className='posts-container'>
        {
          posts.map(post => {
            return (
              <div key={post.id} className='post'>
                <h3>{post.title}</h3>
                <p>{post.contents}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
