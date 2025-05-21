import { useAuth } from "../contexts/AuthContext";
import Post from "../components/Post";

const InfluencerProfile = () => {
  const { user } = useAuth();

  return (
    <div className="page">
      <div className="header">
        <img
          src="https://ui-avatars.com/api/?background=cccccc&color=ffffff&name=+"
          alt="Grey profile"
          className="header--pic"
        />
        <div className="header__details">
          <h2 className="header__details--name">{user.name}</h2>
          <div className="header__details--info">
            <div className="header__details--item">
              <p className="header__details--item-name">Followers</p>
              <p>21</p>
            </div>
            <div className="header__details--item">
              <p className="header__details--item-name">Following</p>
              <p>34</p>
            </div>
          </div>
        </div>
      </div>
      <div className="influencer__posts">
        <h2 className="influencer__posts--title">Posts</h2>
        <Post
            key={1}
            name={user.name}
            media={"https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"}
            likes={123}
            hashtags={["#example", "#post"]}
          />
        </div>
    </div>
  );
};

export default InfluencerProfile;