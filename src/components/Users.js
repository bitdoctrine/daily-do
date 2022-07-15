import './Users.css';

import React from 'react';
import { useCollection } from '../hooks/useCollection';
import Avatar from './Avatar';
import { useAuthContext } from '../hooks/useAuthContext';

const Users = () => {
  const { user: currentUser } = useAuthContext();
  const { error, documents } = useCollection('users');
  return (
    <div className="user-list md:hidden sm:hidden lg:block">
      <h2>Other Users</h2>
      {error && <p className="error">{error}</p>}
      {documents &&
        documents
          .filter((doc) => doc.id !== currentUser.uid)
          .map((user) => (
            <div className="user-list-item" key={user.id}>
              {user.online && (
                <span className="online-user bg-green-500"></span>
              )}
              <span>{user.displayName}</span>
              <Avatar src={user.photoURL} isOnline={user.online} />
            </div>
          ))}
    </div>
  );
};

export default Users;
