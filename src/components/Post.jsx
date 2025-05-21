import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Post = ({id, name, media, likes, hashtags}) => {
  const [mediaType, setMediaType] = useState('');
  const [red, setRed] = useState(false);
  useEffect(() => {
    if (media.includes('http')) {
      setMediaType('image');
    }
  }, [media]);

  return (
    <div className='post' key={id}>
      <div className="post__user">
        <img src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" alt="User" />
        <Link to={`/influencer/${id}`} > { name } </Link>
      </div>
      <div className="post__container">
        <div className='post__container--media'>
          { mediaType === 'image' ? <img className='post__container--media-img' src={ media } alt="Post" /> : <p> { media } </p> }
        </div>
      </div>
      <div className="post__stats">
        <button className='post__stats--likes' onClick={() => setRed(true)}>
          <FontAwesomeIcon icon ="fa-solid fa-heart" className={`post__stats--likes--icon ${red ? "red" : ""}`}/>
          <span> { likes } </span>
        </button>
        <div className="post__hashtags">{ hashtags }</div>
      </div>
    </div>
  );
};

export default Post;