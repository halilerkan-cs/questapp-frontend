import { useEffect, useState } from 'react';
import { Post } from '../Post/Post';
import { PostForm } from '../Post/PostForm';
import { useAuth } from '../../hooks/AuthProvider';
import { Get } from '../../services/HttpService';

const Home = () => {
  const [error, setError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);
  const user = useAuth();

  useEffect(() => {
    Get('/api/posts')
      .then((res) => res.json())
      .then((result) => (setIsLoaded(true), setPostList(result)))
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
        console.log(error);
      });
  }, []);

  const refreshPosts = () => {
    Get('/api/posts')
      .then((res) => res.json())
      .then((result) => (setIsLoaded(true), setPostList(result)))
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  };

  if (error) {
    return <div>Error</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        backgroundColor: '#f0f5ff',
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2em',
        padding: '20px 0 20px',
      }}
    >
      {user.userId != null && (
        <PostForm
          userId={user.userId}
          userName={user.userName}
          refreshPosts={refreshPosts}
        />
      )}
      {postList.length !== 0 &&
        postList.map((post) => (
          <Post
            key={post.id}
            postId={post.id}
            userId={post.userId}
            userName={post.userName}
            title={post.title}
            content={post.content}
            likes={post.likes}
          />
        ))}
    </div>
  );
};

export default Home;
