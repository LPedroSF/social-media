import { useState, useEffect } from 'react';
import Post from '../components/Post';
import Skeleton from '../components/UI/Skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      async function fetchPosts() {
        const res = await fetch(`http://localhost:4000/posts`);
        const data = await res.json();
        setPosts(data);
        setLoading(false);
      }
      fetchPosts();
    },[]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!posts ) return;

    const filtered = posts.filter(post =>
      post.hashtags.some((hashtag) =>
        hashtag.toLowerCase().includes(query.toLowerCase())
      )
    );

    setResults(filtered);
  };

  return (
    <div className="page">
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
      <div className="search-results">
        {loading ? (
          <div className='post'>
            <div className="post__user">
              <Skeleton width="50px" height="50px" borderRadius="50%"/>
              <Skeleton width="100px" height="20px" borderRadius="5px"/>
            </div>
            <div className="post__container">
              <div className='post__container--media'>
                <Skeleton width="100%" height="400px"/>
              </div>
            </div>
            <div className="post__stats">
              <button className='post__stats--likes'>
                <FontAwesomeIcon icon ="fa-solid fa-heart" className={`post__stats--likes--icon`}/>
              </button>
            </div>
          </div>
        ) : results.length > 0 ? (
          results.map((post) => (
            <Post
              key={post.id}
              name={post.name}
              media={post.post_content}
              likes={post.likes}
              hashtags={post.hashtags}
            />
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;