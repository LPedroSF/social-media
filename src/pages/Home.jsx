import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import Post from '../components/Post';
import Skeleton from '../components/UI/Skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    async function fetchPosts() {
      const res = await fetch(`http://localhost:4000/posts`);
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    }
    
    fetchPosts();
  },[]);

  const filterPosts = (filter) => {
    switch (filter) {
      case "Newest":
        return setPosts(posts.slice().sort((post_a, post_b) => new Date(post_b.created_at) - new Date(post_a.created_at)));
      case "Oldest":
          return setPosts(posts.slice().sort((post_a, post_b) => new Date(post_a.created_at) - new Date(post_b.created_at)));
      case "mostLiked":
        return setPosts(posts.slice().sort((post_a, post_b) => post_b.likes - post_a.likes));
      default:
        break;
    }
  };

  return (
    <div className="page">
      <div className="home__header">
        <h1>Social Media App</h1>
        <select id="filter"
          onChange={(e) => filterPosts(e.target.value)}
          defaultValue={"Default"}
          className='home__header--select'
        >
          <option value="Default" disabled>Filter</option>
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
          <option value="mostLiked">Most Liked</option>
        </select>
      </div>
      
      <div className="home__posts">
        { loading ? 
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
        :
          posts.map((post) => (
            <Post
              key={post.id}
              name={post.name}
              media={post.post_content}
              likes={post.likes}
              hashtags={post.hashtags}
            />
          ))} 
      </div>     
    </div>
  );
};

export default Home;