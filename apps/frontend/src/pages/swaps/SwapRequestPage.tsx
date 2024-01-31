import useGetSwapRequests from '../../hooks/swaps/useGetSwapRequests';

export default function SwapRequestPage() {
  const { content } = useGetSwapRequests();

  return (
    <div className="bg-cover bg-center min-h-screen bg-[url(https://wallpaperaccess.com/full/1891379.png)] p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        Swap requests
      </h1>
      <div className="max-w-3xl mx-auto bg-white bg-opacity-80 p-6 rounded-md shadow-md">
        {content}
      </div>
    </div>
  );
}
