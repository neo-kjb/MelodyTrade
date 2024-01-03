export default function DiskImage({ disk }) {
  console.log(disk);

  return (
    <div className="grid justify-items-center">
      <img
        className="h-32 w-32 object-cover rounded-lg"
        src={`${disk.imageURL}`}
        alt="Album Art"
      />
      <p>{disk.name}</p>
    </div>
  );
}
