import UserAvatar from '../Avatar/Avatar';
import UserActivity from '../UserActivity/UserActivity';

const User = () => {
  return (
    <div
      style={{
        height: '100%',
        backgroundColor: '#f0f5ff',
        padding: '40px',
        display: 'flex',
        gap: 40,
      }}
    >
      <UserAvatar />
      <UserActivity />
    </div>
  );
};

export default User;
