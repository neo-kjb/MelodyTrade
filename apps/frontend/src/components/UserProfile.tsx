import React from 'react';

export default function UserProfile({ user }) {
  return (
    <div className="mt-5 ml-5 flex items-center">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEWmvOd3wx2xgbP6-heFfS7-QPqV03G-IDMH45ix9aYw&s"
        alt={`${user.username}'s profile`}
        className="w-20 h-20 rounded-full mr-4"
      />
      <div>
        <p className="text-lg font-semibold">{user.username}</p>
      </div>
    </div>
  );
}
