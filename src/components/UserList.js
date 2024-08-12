// src/components/UserList.js
import React, { useState, useEffect } from 'react';
import { db, collection, onSnapshot } from '../firebase';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const userList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="user-list">
      <h3>Registered Users</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
