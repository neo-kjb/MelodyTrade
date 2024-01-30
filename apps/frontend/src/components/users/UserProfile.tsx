import { User } from '@melody-trade/api-interfaces';
import React from 'react';

export default function UserProfile(props: { user: User }) {
  const { user } = props;
  return (
    <div className="mt-5 ml-5 flex items-center">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEWmvOd3wx2xgbP6-heFfS7-QPqV03G-IDMH45ix9aYw&s"
        alt={`${user.username}'s profile`}
        className="w-20 h-20 rounded-full mr-4 object-cover"
      />
      <div>
        <div className="bg-gray-800 rounded-md p-2">
          <p className="text-xl font-bold text-white">{user.username}</p>
        </div>
      </div>
    </div>
  );
}
