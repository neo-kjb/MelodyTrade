import { useState } from 'react';

export default function DiskImage({ disk, onSelect }) {
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = () => {
    setIsSelected(!isSelected);
    onSelect(disk);
  };

  return (
    <div
      className={`grid justify-items-center p-4 ${
        isSelected ? 'border-2 border-blue-500' : 'border border-gray-300'
      } rounded-full`}
      onClick={handleClick}
    >
      <img
        className={`h-32 w-32 object-cover rounded-full ${
          isSelected ? 'ring-4 ring-blue-500' : 'ring-2 ring-gray-300'
        }`}
        src={`${disk.imageURL}`}
        alt="Album Art"
      />
      <p>{disk.name}</p>
    </div>
  );
}
