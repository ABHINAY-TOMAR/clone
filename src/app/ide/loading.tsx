export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#1e1e1e] text-white">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
        <h2 className="text-xl font-semibold opacity-80">Loading IDE Workspace...</h2>
      </div>
    </div>
  );
}
