import useSwapHistory from '../../hooks/swaps/useSwapHistory';

export default function SwapHistory() {
  const { content } = useSwapHistory();

  return (
    <div className="text-center mt-10">
      <h2 className="text-3xl font-bold mb-4">Swap History</h2>
      <hr className="my-4 border-t-2 border-gray-300" />
      <div className="flex justify-center mt-4">{content}</div>
    </div>
  );
}
